import express from 'express';
import cors from 'cors';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode';
import nodemailer from 'nodemailer';
import Imap from 'imap-simple';
import dotenv from 'dotenv';
import ical from 'node-ical';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- WHATSAPP SETUP ---
let mockMode = false; // Real mode
let waReady = false;
let waQr = '';

// In-memory mock database
let mockChats = [
    {
        name: "Investor Update",
        unreadCount: 2,
        id: "120363024888888888@g.us",
        messages: [
            { body: "Hello, is the new build ready?", fromMe: false, timestamp: Date.now() - 3600000 },
            { body: "The pitch deck looks incredible. When can we see the live demo?", fromMe: false, timestamp: Date.now() - 1800000 }
        ]
    },
    {
        name: "Dev Team",
        unreadCount: 0,
        id: "120363024999999999@g.us",
        messages: [
            { body: "Local RAG is now 2x faster with the new indexing logic.", fromMe: false, timestamp: Date.now() - 7200000 }
        ]
    },
    {
        name: "Sarah (Ops)",
        unreadCount: 1,
        id: "19999999999@c.us",
        messages: [
            { body: "Can you check the calendar for the Q3 review?", fromMe: false, timestamp: Date.now() - 86400000 }
        ]
    }
];

const waClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

waClient.on('qr', (qr: string) => {
    if (mockMode) return;
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err: any, url: string) => {
        if (!err) waQr = url;
    });
});

waClient.on('ready', () => {
    if (mockMode) return;
    console.log('WhatsApp Client is ready!');
    waReady = true;
    waQr = ''; // Clear QR once ready
});

waClient.on('disconnected', () => {
    if (mockMode) return;
    waReady = false;
});

// Initialize QR code for Mock Mode
const generateMockQr = () => {
    qrcode.toDataURL("SHADOW-AGENT-MOCK-WHATSAPP-PAIRING-TOKEN", (err: any, url: string) => {
        if (!err) waQr = url;
    });
};

// Initialize WA Client
waClient.initialize().catch(err => {
    console.log("------------------------------------------------------------------");
    console.log("ERROR: Failed to connect to WhatsApp Web.");
    console.log(err.message);
    console.log("------------------------------------------------------------------");
});

// Remove timeout fallback for mock mode to ensure it stays in real mode

// --- WHATSAPP ENDPOINTS ---
app.get('/whatsapp/status', (req, res) => {
    res.json({ ready: waReady, qr: waQr, mockMode });
});

app.post('/whatsapp/send', async (req, res) => {
    const { to, message } = req.body;
    if (!waReady) return res.status(400).json({ error: 'WhatsApp not ready' });
    try {
        const chatId = to.includes('@c.us') ? to : `${to}@c.us`;
        const response = await waClient.sendMessage(chatId, message);
        res.json({ success: true, id: response.id._serialized });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/whatsapp/messages', async (req, res) => {
    if (!waReady) return res.status(400).json({ error: 'WhatsApp not ready' });
    try {
        const chats = await waClient.getChats();
        const recentChats = chats.slice(0, 5).map((c: any) => ({
            name: c.name,
            unreadCount: c.unreadCount,
            id: c.id._serialized,
        }));
        res.json({ chats: recentChats });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// --- EMAIL SETUP ---
app.get('/email/inbox', async (req, res) => {
    const user = process.env.IMAP_USER;
    const password = process.env.IMAP_PASS;
    const host = process.env.IMAP_HOST;

    if (!user || !password || !host) {
        return res.status(400).json({ error: 'Email credentials not provided in .env' });
    }

    const config = {
        imap: {
            user,
            password,
            host,
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            authTimeout: 5000
        }
    };

    try {
        const connection = await Imap.connect(config);
        await connection.openBox('INBOX');
        const searchCriteria = ['UNSEEN'];
        const fetchOptions = { bodies: ['HEADER'], markSeen: false };
        
        const results = await connection.search(searchCriteria, fetchOptions);
        const emails = results.map(res => {
            const header = res.parts.find(p => p.which === 'HEADER')?.body;
            return {
                subject: header?.subject?.[0],
                from: header?.from?.[0],
                date: header?.date?.[0]
            };
        });
        
        connection.end();
        res.json({ success: true, emails: emails.slice(0, 5) });
    } catch (err: any) {
        console.log(`IMAP failed (${err.message})`);
        res.status(500).json({ error: err.message });
    }
});

// --- CALENDAR SETUP ---
app.get('/calendar/events', (req, res) => {
    const calendarPath = path.join(__dirname, 'calendar.ics');
    if (!fs.existsSync(calendarPath)) {
        return res.status(400).json({ error: 'calendar.ics not found in integrations folder' });
    }

    try {
        const events = ical.sync.parseFile(calendarPath);
        const upcoming: any[] = [];
        const now = new Date();

        for (const rawEvent of Object.values(events)) {
            const event = rawEvent as any;
            if (event && event.type === 'VEVENT') {
                const startDate = new Date(event.start as Date);
                if (startDate > now) {
                    upcoming.push({
                        summary: event.summary,
                        start: startDate.toISOString(),
                        end: new Date(event.end as Date).toISOString()
                    });
                }
            }
        }
        
        upcoming.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        res.json({ success: true, events: upcoming.slice(0, 5) });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// --- SMTP EMAIL SENDING ---
app.post('/email/send', async (req, res) => {
    const { to, subject, body } = req.body;
    const user = process.env.IMAP_USER;
    const password = process.env.IMAP_PASS;
    const host = process.env.IMAP_HOST;

    if (!user || !password || !host) {
        return res.status(400).json({ error: 'Email credentials not provided in .env' });
    }

    try {
        const smtpHost = host.replace('imap', 'smtp');
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: 465,
            secure: true,
            auth: {
                user,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const info = await transporter.sendMail({
            from: user,
            to,
            subject,
            text: body
        });
        res.json({ success: true, messageId: info.messageId });
    } catch (err: any) {
        console.log(`SMTP failed (${err.message})`);
        res.status(500).json({ error: err.message });
    }
});

// --- AUTONOMOUS WORKFLOW ENGINE & SUGGESTION QUEUE ---
interface Suggestion {
    id: string;
    type: 'email' | 'calendar' | 'whatsapp' | 'cross-tool';
    title: string;
    description: string;
    rawContext: string;
    suggestedAction: {
        tool: 'email' | 'calendar' | 'whatsapp';
        params: any;
    };
    status: 'pending' | 'approved' | 'dismissed';
    createdAt: string;
}

let suggestions: Suggestion[] = [];
let processedEmails = new Set<string>();
let processedWhatsApp = new Set<string>();

// Helper to append a new event to calendar.ics
function appendCalendarEvent(summary: string, startIso: string, endIso: string) {
    const calendarPath = path.join(__dirname, 'calendar.ics');
    if (!fs.existsSync(calendarPath)) {
        fs.writeFileSync(calendarPath, `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ShadowAgent//Calendar Sync//EN\nEND:VCALENDAR\n`, 'utf8');
    }
    
    const content = fs.readFileSync(calendarPath, 'utf8');
    const start = new Date(startIso);
    const end = new Date(endIso);
    
    const formatICSDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const newEvent = `BEGIN:VEVENT
UID:${Date.now()}@shadowagent.local
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${summary}
DESCRIPTION:Scheduled automatically by ShadowAgent
END:VEVENT\n`;

    const idx = content.lastIndexOf('END:VCALENDAR');
    if (idx !== -1) {
        const updatedContent = content.substring(0, idx) + newEvent + content.substring(idx);
        fs.writeFileSync(calendarPath, updatedContent, 'utf8');
    }
}

// REST endpoints for suggestions
app.get('/automation/suggestions', (req, res) => {
    res.json({ success: true, suggestions });
});

app.post('/automation/suggestions/:id/approve', async (req, res) => {
    const { id } = req.params;
    const item = suggestions.find(s => s.id === id);
    if (!item) return res.status(404).json({ error: 'Suggestion not found' });
    if (item.status !== 'pending') return res.status(400).json({ error: 'Suggestion already processed' });

    try {
        if (item.suggestedAction.tool === 'email') {
            const { to, subject, body } = item.suggestedAction.params;
            const user = process.env.IMAP_USER;
            const password = process.env.IMAP_PASS;
            const host = process.env.IMAP_HOST;
            
            if (user && password && host) {
                const smtpHost = host.replace('imap', 'smtp');
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: 465,
                    secure: true,
                    auth: { user, pass: password },
                    tls: { rejectUnauthorized: false }
                });
                await transporter.sendMail({
                    from: user,
                    to,
                    subject,
                    text: body
                });
            } else {
                throw new Error('Email credentials not set');
            }
        } else if (item.suggestedAction.tool === 'calendar') {
            const { summary, start, end } = item.suggestedAction.params;
            appendCalendarEvent(summary, start, end);
        } else if (item.suggestedAction.tool === 'whatsapp') {
            const { contact, message } = item.suggestedAction.params;
            if (!waReady) throw new Error('WhatsApp is not ready');
            const chatId = contact.includes('@c.us') ? contact : `${contact}@c.us`;
            await waClient.sendMessage(chatId, message);
        }

        item.status = 'approved';
        res.json({ success: true, item });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/automation/suggestions/:id/dismiss', (req, res) => {
    const { id } = req.params;
    const item = suggestions.find(s => s.id === id);
    if (!item) return res.status(404).json({ error: 'Suggestion not found' });
    
    item.status = 'dismissed';
    res.json({ success: true, item });
});

// Helper to analyze email content using local Ollama model if available
async function analyzeEmailWithOllama(subject: string, from: string): Promise<{ isMeeting: boolean, summary: string, date: string }> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout for local Ollama speed

        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3-groq-tool-use',
                prompt: `Analyze the following email subject and sender. Determine if they are asking to schedule a meeting, call, review, or appointment.
Subject: "${subject}"
From: "${from}"
Reply with a JSON object containing keys:
- isMeeting (boolean)
- summary (string: a concise title for the meeting, or empty string if not a meeting)
- date (string: ISO string for tomorrow at 2 PM, or empty string)
JSON:`,
                format: 'json',
                stream: false,
                options: { temperature: 0.1 }
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        const resData = await response.json();
        const obj = JSON.parse(resData.response);
        return {
            isMeeting: !!obj.isMeeting,
            summary: obj.summary || `Meeting with ${from}`,
            date: obj.date || new Date(Date.now() + 86400000).toISOString()
        };
    } catch (e) {
        // Fallback to keyword matching
        const subLower = subject.toLowerCase();
        const isMeeting = subLower.includes('meet') || subLower.includes('schedule') || subLower.includes('appointment') || subLower.includes('calendar') || subLower.includes('call');
        return {
            isMeeting,
            summary: `Meeting: ${subject}`,
            date: new Date(Date.now() + 86400000).toISOString()
        };
    }
}

// Automation Poller logic
async function checkEmailsForAutomations() {
    const user = process.env.IMAP_USER;
    const password = process.env.IMAP_PASS;
    const host = process.env.IMAP_HOST;
    if (!user || !password || !host) return;

    const config = {
        imap: {
            user,
            password,
            host,
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            authTimeout: 5000
        }
    };

    try {
        const connection = await Imap.connect(config);
        await connection.openBox('INBOX');
        const results = await connection.search(['UNSEEN'], { bodies: ['HEADER'], markSeen: false });
        
        for (const r of results) {
            const header = r.parts.find(p => p.which === 'HEADER')?.body;
            const subject = header?.subject?.[0] || 'No Subject';
            const from = header?.from?.[0] || 'Unknown';
            const date = header?.date?.[0] || '';
            const uniqueKey = `${date}-${from}-${subject}`;

            if (processedEmails.has(uniqueKey)) continue;
            processedEmails.add(uniqueKey);

            // Analysis: if mentions meeting scheduling
            const analysis = await analyzeEmailWithOllama(subject, from);
            if (analysis.isMeeting) {
                suggestions.push({
                    id: `email-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                    type: 'calendar',
                    title: 'Schedule Proposed Meeting',
                    description: `Meeting request detected from ${from}: "${subject}". Suggesting to book a slot for "${analysis.summary}".`,
                    rawContext: `Email Subject: ${subject}\nFrom: ${from}`,
                    suggestedAction: {
                        tool: 'calendar',
                        params: {
                            summary: analysis.summary,
                            start: analysis.date,
                            end: new Date(new Date(analysis.date).getTime() + 3600000).toISOString()
                        }
                    },
                    status: 'pending',
                    createdAt: new Date().toISOString()
                });
            } else {
                suggestions.push({
                    id: `email-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                    type: 'email',
                    title: 'Draft Autonomous Response',
                    description: `Draft reply for incoming email from ${from}: "${subject}".`,
                    rawContext: `Email Subject: ${subject}\nFrom: ${from}`,
                    suggestedAction: {
                        tool: 'email',
                        params: {
                            to: from,
                            subject: `Re: ${subject}`,
                            body: `Hi,\n\nThanks for your email regarding "${subject}". I've received it and will follow up shortly.\n\nBest regards,\nShadow Agent`
                        }
                    },
                    status: 'pending',
                    createdAt: new Date().toISOString()
                });
            }
        }
        connection.end();
    } catch (err: any) {
        console.log(`Automation IMAP check failed: ${err.message}`);
        if (err.message.includes('Invalid credentials') || err.message.includes('Failure') || err.message.includes('auth')) {
            const uniqueKey = 'email-credentials-error-suggestion';
            if (!processedEmails.has(uniqueKey)) {
                processedEmails.add(uniqueKey);
                suggestions.unshift({
                    id: `email-config-error`,
                    type: 'email',
                    title: 'Action Required: Configure App Password',
                    description: `IMAP connection failed with "${err.message}". To enable live email synchronization, please create a Google App Password and update your .env file in the integrations folder.`,
                    rawContext: `Error: IMAP Connection Rejected by Google\nUser: ${user}\nHost: ${host}`,
                    suggestedAction: {
                        tool: 'email',
                        params: {}
                    },
                    status: 'pending',
                    createdAt: new Date().toISOString()
                });
            }
        }
    }
}

async function checkWhatsAppForAutomations() {
    if (!waReady) return;
    try {
        const chats = await waClient.getChats();
        const unreadChats = chats.filter((c: any) => c.unreadCount > 0);

        for (const chat of unreadChats) {
            const messages = await chat.fetchMessages({ limit: 1 });
            if (messages.length === 0) continue;
            const lastMsg = messages[0];
            if (lastMsg.fromMe) continue;

            const uniqueKey = `${lastMsg.id._serialized}`;
            if (processedWhatsApp.has(uniqueKey)) continue;
            processedWhatsApp.add(uniqueKey);

            suggestions.push({
                id: `wa-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                type: 'whatsapp',
                title: `Draft Reply for ${chat.name}`,
                description: `WhatsApp message: "${lastMsg.body}". Suggesting a reply message.`,
                rawContext: `WhatsApp Chat: ${chat.name}\nMessage: ${lastMsg.body}`,
                suggestedAction: {
                    tool: 'whatsapp',
                    params: {
                        contact: chat.id._serialized,
                        message: `Hello ${chat.name}, thank you for your message. I'm processing it now.`
                    }
                },
                status: 'pending',
                createdAt: new Date().toISOString()
            });
        }
    } catch (err: any) {
        console.log(`Automation WhatsApp check failed: ${err.message}`);
    }
}

// Start background automation poller loop every 15 seconds
setInterval(async () => {
    await checkEmailsForAutomations();
    await checkWhatsAppForAutomations();
}, 15000);

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`ShadowAgent Integration Server running on port ${PORT}`);
});
