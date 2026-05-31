const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

/**
 * SHADOWAGENT WHATSAPP SIDECAR
 * This script runs in a separate Node.js process managed by Tauri.
 * It handles the headless browser and session persistence.
 */

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: process.argv[2] || './wa_session'
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    // In production, we send this QR string back to the Tauri UI via IPC/Stdout
    console.log('QR_RECEIVED:' + qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WA_STATUS:READY');
});

client.on('message', async (msg) => {
    // Forward incoming messages to the AI Agent
    console.log(`WA_MSG_INBOUND: ${msg.from}: ${msg.body}`);
});

// Command Listener from Tauri
process.stdin.on('data', async (data) => {
    const command = JSON.parse(data.toString());
    if (command.type === 'SEND_MESSAGE') {
        await client.sendMessage(command.to, command.body);
        console.log('WA_STATUS:SENT');
    }
});

client.initialize();
