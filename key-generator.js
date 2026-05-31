const crypto = require('crypto');

/**
 * SHADOWAGENT LICENSE GENERATOR
 * Run this to create unique keys for your customers.
 */

function generateLicenseKey(tier = "PRO") {
  const randomPart = crypto.randomBytes(8).toString('hex').toUpperCase();
  const segments = randomPart.match(/.{1,4}/g);
  return `SHADOW-${tier}-${segments.join('-')}`;
}

console.log("--- SHADOWAGENT KEY GENERATOR ---");
console.log("Customer 1 (Standard):", generateLicenseKey("STD"));
console.log("Customer 2 (Pro):     ", generateLicenseKey("PRO"));
console.log("Customer 3 (Ultra):   ", generateLicenseKey("ULTRA"));
console.log("---------------------------------");
