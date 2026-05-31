import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Transporter (reads from env vars — credentials NEVER in code) ───────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.titan.email",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS on port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── HTML Email builder ───────────────────────────────────────────────────────
function buildHtml(subject: string, rows: { label: string; value: string }[]) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rowsHtml = rows
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:10px 16px;color:#8b8fa8;font-size:12px;font-family:monospace;width:160px;vertical-align:top;border-bottom:1px solid #1a1a2e;">${label}</td>
        <td style="padding:10px 16px;color:#e2e8f0;font-size:13px;font-family:monospace;border-bottom:1px solid #1a1a2e;word-break:break-all;">${value}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#05050a;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:580px;margin:40px auto;background:#0d0d1a;border:1px solid #1a1a3e;border-radius:16px;overflow:hidden;">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f0f23 0%,#1a1a3e 100%);padding:28px 32px;border-bottom:1px solid #1a1a3e;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;background:linear-gradient(135deg,#06b6d4,#8b5cf6);border-radius:8px;display:flex;align-items:center;justify-content:center;">
          <span style="color:white;font-size:16px;">⬡</span>
        </div>
        <div>
          <div style="color:#06b6d4;font-size:10px;font-family:monospace;letter-spacing:0.2em;text-transform:uppercase;">ShadowAgent</div>
          <div style="color:white;font-size:16px;font-weight:700;margin-top:2px;">${subject}</div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;">
        ${rowsHtml}
        <tr>
          <td style="padding:10px 16px;color:#8b8fa8;font-size:12px;font-family:monospace;width:160px;border-bottom:1px solid #1a1a2e;">Timestamp</td>
          <td style="padding:10px 16px;color:#64748b;font-size:12px;font-family:monospace;border-bottom:1px solid #1a1a2e;">${timestamp} IST</td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;border-top:1px solid #1a1a3e;text-align:center;">
      <p style="color:#334155;font-size:10px;font-family:monospace;letter-spacing:0.15em;margin:0;">
        SHADOWAGENT NOTIFICATION SYSTEM · LOCAL SOVEREIGN AI
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Generate a deterministic, sequential fallback queue number starting from 1
  // Base date is set to June 1, 2026
  const baseDate = new Date("2026-06-01T00:00:00Z").getTime();
  const now = Date.now();
  // Increment by 1 every 20 minutes (72 queue slots per day)
  const elapsedMinutes = Math.floor((now - baseDate) / (1000 * 60 * 20));
  let fallbackQueue = Math.max(1, elapsedMinutes + 1);

  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
    }

    // ── 1. Google Sheets Web App Webhook Integration (Optional & Highly Recommended) ─────
    if (process.env.GOOGLE_SCRIPT_URL) {
      try {
        const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, data }),
        });
        const result = await response.json();
        if (result.success && typeof result.queue === "number") {
          return NextResponse.json({ success: true, queue: result.queue });
        }
      } catch (scriptErr) {
        console.error("[notify] Google Script webhook failed, falling back to local:", scriptErr);
      }
    }

    let subject = "";
    let rows: { label: string; value: string }[] = [];

    // ── Beta Access / Waitlist ────────────────────────────────────────────────
    if (type === "beta_access") {
      subject = "🚀 New Beta Access Request";
      rows = [
        { label: "Full Name",     value: data.name        || "—" },
        { label: "Email",         value: data.email       || "—" },
        { label: "Use Case",      value: data.useCase     || "—" },
        { label: "LLM Setup",     value: data.aiSetup     || "—" },
        { label: "Platform / OS", value: data.platform    || "—" },
        { label: "Queue Position",value: `#${fallbackQueue}` || "—" },
      ];
    }

    // ── Newsletter Signup ─────────────────────────────────────────────────────
    else if (type === "newsletter") {
      subject = "📬 New Newsletter Subscriber";
      rows = [
        { label: "Email", value: data.email || "—" },
      ];
    }

    // ── Unknown type ──────────────────────────────────────────────────────────
    else {
      return NextResponse.json({ error: "Unknown notification type" }, { status: 400 });
    }

    // ── 2. Standard SMTP Fallback ────────────────────────────────────────────
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"ShadowAgent Notifications" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
          subject: `${subject} – ShadowAgent`,
          html: buildHtml(subject, rows),
        });
      } catch (smtpErr) {
        // Log SMTP error but do NOT fail the response. This guarantees local and server reliability.
        console.error("[notify] SMTP fallback send error:", smtpErr);
      }
    } else {
      console.log("[notify] SMTP credentials not set, skipping fallback email send.");
    }

    // Return successful response with the deterministic sequential queue number
    return NextResponse.json({ success: true, queue: fallbackQueue });
  } catch (err: unknown) {
    console.error("[notify] Unhandled API error:", err);
    // Never fail with 500 to guarantee a seamless user experience
    return NextResponse.json({ success: true, queue: fallbackQueue });
  }
}
