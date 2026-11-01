const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false });

const safeEqual = (a = '', b = '') => {
  const x = crypto.createHash('sha256').update(String(a)).digest();
  const y = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
};

// POST /api/auth/login  -> { token }
router.post('/login', limiter, (req, res) => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;
  if (!ADMIN_EMAIL?.trim() || !ADMIN_PASSWORD?.trim() || !JWT_SECRET?.trim()) {
    return res.status(503).json({ error: 'Admin authentication is not configured.' });
  }

  const { email, password } = req.body || {};
  const okEmail = safeEqual(email, ADMIN_EMAIL);
  const okPass = safeEqual(password, ADMIN_PASSWORD);
  if (!okEmail || !okPass) return res.status(401).json({ error: 'Email or password is incorrect.' });
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

module.exports = router;
