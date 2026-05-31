const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'shadow-secret-2026';

// Mock database
const VALID_LICENSE_KEYS = ['SHADOW-2026', 'PRO-SHADOW-99'];

app.post('/api/validate', (req, res) => {
  const { key } = req.body;

  if (VALID_LICENSE_KEYS.includes(key)) {
    const token = jwt.sign({ key, activatedAt: new Date() }, SECRET_KEY, { expiresIn: '365d' });
    return res.json({ 
      success: true, 
      token,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });
  }

  res.status(401).json({ success: false, message: 'Invalid license key' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Licensing server running on port ${PORT}`);
});
