import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "SHADOW_SERVER_SECRET_2026";

function generateMockLicenseKey(tier: string = "PRO") {
  const randomPart = crypto.randomBytes(8).toString("hex").toUpperCase();
  const segments = randomPart.match(/.{1,4}/g);
  return `SHADOW-${tier}-${segments ? segments.join("-") : randomPart}`;
}

export async function POST(request: Request) {
  try {
    const { email, tier } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const selectedTier = (tier || "PRO").toUpperCase();
    const licenseKey = generateMockLicenseKey(selectedTier);
    
    // Create a 1-year activation token signed with the shared JWT secret
    const token = jwt.sign(
      {
        sub: email,
        license_key: licenseKey,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // 1 Year
      },
      JWT_SECRET
    );

    return NextResponse.json({
      success: true,
      email,
      license_key: licenseKey,
      token: token,
      expires_at: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
