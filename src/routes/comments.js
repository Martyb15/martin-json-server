const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// GET /api/comments — all comments (optionally filter by projectId)
router.get('/', async (req, res, next) => {
  try {
    const where = req.query.projectId
      ? { projectId: parseInt(req.query.projectId) }
      : {};
    const comments = await prisma.comment.findMany({
      where,
      orderBy: { date: 'desc' },
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// POST /api/comments — create a comment
router.post('/', async (req, res, next) => {
  try {
    const { projectId, rating, text, author } = req.body;

    // Basic validation
    if (!projectId || !rating || !text || !author) {
      return res.status(400).json({ error: 'Missing required fields: projectId, rating, text, author' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Verify project exists
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const comment = await prisma.comment.create({
      data: { projectId, rating, text, author },
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

// PUT /api/comments/:id — update a comment
router.put('/:id', async (req, res, next) => {
  try {
    const { rating, text } = req.body;
    const comment = await prisma.comment.update({
      where: { id: parseInt(req.params.id) },
      data: { rating, text },
    });
    res.json(comment);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Comment not found' });
    }
    next(err);
  }
});

// DELETE /api/comments/:id — delete a comment
router.delete('/:id', auth, async (req, res, next) => {
  try {
    await prisma.comment.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).end();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Comment not found' });
    }
    next(err);
  }
});

module.exports = router;