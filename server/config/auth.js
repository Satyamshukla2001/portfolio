const exampleValues = new Set([
  'you@example.com',
  'change-this-password',
  'replace-with-a-long-random-string'
]);

function validateAuthConfig(env = process.env) {
  const required = ['ADMIN_EMAIL', 'ADMIN_PASSWORD', 'JWT_SECRET'];
  const missing = required.filter((name) => !env[name]?.trim());
  if (missing.length) {
    throw new Error(`Missing required authentication settings: ${missing.join(', ')}`);
  }

  const placeholders = required.filter((name) => exampleValues.has(env[name].trim().toLowerCase()));
  if (placeholders.length) {
    throw new Error(`Replace example authentication settings before starting: ${placeholders.join(', ')}`);
  }

  if (Buffer.byteLength(env.ADMIN_PASSWORD, 'utf8') < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 bytes.');
  }

  if (Buffer.byteLength(env.JWT_SECRET, 'utf8') < 32) {
    throw new Error('JWT_SECRET must be at least 32 bytes; generate a cryptographically random secret.');
  }
}

module.exports = validateAuthConfig;
