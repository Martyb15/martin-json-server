// GET /api/projects — all projects
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

module.exports = router;