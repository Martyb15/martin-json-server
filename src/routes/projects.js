// GET /api/projects — all projects
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

router.get('/', async (_req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/featured — featured project
router.get('/featured', async (_req, res, next) => {
  try {
    const project = await prisma.project.findFirst({
      where: { featured: true },
    });
    if (!project) return res.status(404).json({ error: 'No featured project' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id — single project with comments
router.get('/:id', async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { comments: { orderBy: { date: 'desc' } } },
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// ---- ADMIN ROUTES (protected) ----

// POST /api/projects/ - create a project
router.post('/', auth, async (req, res, next) => {
  try {
    const { name, image, techStack, featured, description } = req.body;
    const project = await prisma.project.create({
      data: { name, image, techStack, featured, description }
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/:id - update a project
router.put ('/:id', auth, async (req, res, next) => {
  try {
    const { name, image, techStack, featured, description } = req.body; 
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) }, 
      data: { name, image, techStack, featured, description }
    });
    res.json(project); 
  }catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Project not found'});
    next(err); 
  }
});

// DELETE /api/projects/:id - delete a project
router.delete('/:id', auth, async (req, res, next) => {
  try{
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } }); 
    res.status(204).end(); 
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Project not found' });
    next(err); 
  }
});

module.exports = router;