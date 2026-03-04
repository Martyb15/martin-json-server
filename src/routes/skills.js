const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/skills — all skills
router.get('/', async (_req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(skills);
  } catch (err) {
    next(err);
  }
});

// GET /api/skills/:id — single skill
router.get('/:id', async (req, res, next) => {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    next(err);
  }
});

module.exports = router;