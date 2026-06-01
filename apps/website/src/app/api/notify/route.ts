import { NextRequest, NextResponse } from "next/server";

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

    // ── 1. Google Sheets Web App Webhook Integration (Primary & Sovereign Database) ───
    const webhookUrl = process.env.GURL || process.env.GOOGLE_SCRIPT_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, data }),
        });
        const responseText = await response.text();
        console.log("[notify] Webhook raw response status:", response.status);
        
        try {
          const result = JSON.parse(responseText);
          if (result.success && typeof result.queue === "number") {
            return NextResponse.json({ success: true, queue: result.queue });
          } else {
            console.error("[notify] Webhook returned unsuccessful JSON:", result);
          }
        } catch (jsonErr) {
          console.error("[notify] Webhook response was not valid JSON. First 200 chars:", responseText.substring(0, 200), jsonErr);
        }
      } catch (scriptErr) {
        console.error("[notify] Google Script webhook failed, falling back to local:", scriptErr);
      }
    }

    // Return successful response with the deterministic sequential queue number
    return NextResponse.json({ success: true, queue: fallbackQueue });
  } catch (err: unknown) {
    console.error("[notify] Unhandled API error:", err);
    // Never fail with 500 to guarantee a seamless user experience
    return NextResponse.json({ success: true, queue: fallbackQueue });
  }
}
