require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const validateAuthConfig = require('./config/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      connectSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com']
    }
  }
}));
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '50kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/github', require('./routes/github'));

// In production, serve the built React app from the same server
const dist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.name === 'ValidationError') return res.status(400).json({ error: Object.values(err.errors).map((e) => e.message).join(' ') });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

Promise.resolve()
  .then(() => validateAuthConfig())
  .then(() => connectDB())
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('Startup failed:', err.message);
    process.exit(1);
  });
