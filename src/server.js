const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const commentRoutes = require('./routes/comments');
const skillRoutes = require('./routes/skills');
const certificationRoutes = require('./routes/certifications');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── MIDDLEWARE ───
app.use(helmet());                                   // Security headers
// app.use(cors({ origin: process.env.CLIENT_ORIGIN })); // Restrict to your frontend
app.use(morgan('dev'));                               // Request logging
app.use(express.json());                              // Parse JSON bodies
// Parse CLIENT_ORIGIN as a comma-separated list so both local and production  work
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map(s => s.trim())
  : [];

app.use(cors({ origin: allowedOrigins }));

// ─── ROUTES ───
app.use('/api/projects', projectRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/feedback', feedbackRoutes);

// ─── HEALTH CHECK ───
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── GLOBAL ERROR HANDLER ───
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
