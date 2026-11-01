const express = require('express');
const rateLimit = require('express-rate-limit');
const Message = require('../models/Message');
const requireAdmin = require('../middleware/auth');

const router = express.Router();
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages from this device. Try again in an hour.' }
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Public: send a message
router.post('/', limiter, async (req, res, next) => {
  try {
    const { name = '', email = '', message = '', website = '' } = req.body || {};
    if (website) return res.status(201).json({ ok: true }); // honeypot: bots fill this hidden field
    if (name.trim().length < 2) return res.status(400).json({ error: 'Enter your name.' });
    if (!EMAIL_RE.test(email.trim())) return res.status(400).json({ error: 'Enter a valid email address.' });
    if (message.trim().length < 10) return res.status(400).json({ error: 'Write at least 10 characters in your message.' });
    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
});

// Admin: read inbox
router.get('/', requireAdmin, async (_req, res, next) => {
  try {
    res.json(await Message.find().sort({ createdAt: -1 }).limit(200).lean());
  } catch (err) { next(err); }
});

// Admin: mark read
router.patch('/:id/read', requireAdmin, async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ error: 'Message not found.' });
    res.json(msg);
  } catch (err) { next(err); }
});

module.exports = router;
