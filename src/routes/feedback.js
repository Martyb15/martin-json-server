const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// POST /api/feedback — submit contact form
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNum, email, agree, contactType, feedback } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !feedback) {
      return res.status(400).json({
        error: 'Missing required fields: firstName, lastName, email, feedback',
      });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const entry = await prisma.feedback.create({
      data: { firstName, lastName, phoneNum, email, agree, contactType, feedback },
    });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

// GET /api/feedback — list all feedback
// TODO: protect with auth middleware once JWT is set up
router.get('/', auth, async (_req, res, next) => {
  try {
    const entries = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

module.exports = router;