/**
 * ShadowAgent License Key Manager (Production Simulation)
 * This script generates cryptographically signed license keys using Ed25519.
 * In a real production environment, this would run on your server (Node.js/Cloudflare Workers)
 * triggered by a webhook from Stripe or LemonSqueezy.
 */

const crypto = require('crypto');

// 1. Generate a KeyPair for the ShadowAgent Licensing Authority
// In production, you would keep the PRIVATE_KEY safe on your server 
// and embed the PUBLIC_KEY in the Desktop app.
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');

const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' });
const publicKeyPem = publicKey.export({ type: 'spki', format: 'pem' });

console.log("--- LICENSING AUTHORITY KEYS GENERATED ---");
console.log("PUBLIC KEY (Embed this in Rust backend):\n", publicKeyPem);
console.log("PRIVATE KEY (Keep this on your server):\n", privateKeyPem);

/**
 * Generates a signed license key for a user
 */
function generateLicense(email, plan = "ANNUAL_SOVEREIGN") {
    const payload = JSON.stringify({
        sub: email,
        plan: plan,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year
    });

    const signature = crypto.sign(null, Buffer.from(payload), privateKey);
    
    // The License Key is the Base64 encoded payload + signature
    const licenseKey = `${Buffer.from(payload).toString('base64')}.${signature.toString('base64')}`;
    
    return licenseKey;
}

// Example usage
const userEmail = "pioneer@shadowagent.so";
const newKey = generateLicense(userEmail);

console.log("\n--- GENERATED LICENSE KEY FOR " + userEmail + " ---");
console.log(newKey);
console.log("\n-------------------------------------------");
