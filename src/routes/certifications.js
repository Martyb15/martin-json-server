const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/certifications — all certifications
router.get('/', async (_req, res, next) => {
  try {
    const certs = await prisma.certification.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(certs);
  } catch (err) {
    next(err);
  }
});

// GET /api/certifications/:id — single certification
router.get('/:id', async (req, res, next) => {
  try {
    const cert = await prisma.certification.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!cert) return res.status(404).json({ error: 'Certification not found' });
    res.json(cert);
  } catch (err) {
    next(err);
  }
});

module.exports = router;