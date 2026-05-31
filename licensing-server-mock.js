const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SERVER_SECRET = "SHADOW_SERVER_SECRET_2026";

/**
 * PRODUCTION MOCK: License Activation Server
 * This script demonstrates how your central server should issue tokens.
 */

app.post('/api/v1/activate', (req, res) => {
  const { email, license_key } = req.body;

  console.log(`Activation request for: ${email} with key: ${license_key}`);

  // 1. Validate key in your DB (e.g. check if SHADOW-XXXX-XXXX exists)
  if (license_key.startsWith("SHADOW-")) {
    
    // 2. Issue a 1-year JWT token
    const token = jwt.sign(
      { 
        sub: email, 
        license_key: license_key,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // 1 Year
      }, 
      SERVER_SECRET
    );

    res.json({
      success: true,
      token: token,
      expires_at: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Invalid license key format."
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`ShadowAgent Licensing Server (MOCK) running at http://localhost:${PORT}`);
});
