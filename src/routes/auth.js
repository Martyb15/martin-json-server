const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/auth/register — create a new admin (one-time use)
router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body; 
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' }); 
        }

        // Only allow one admin account to exist
        const existing = await prisma.admin.findFirst(); 
        if (existing) {
            return res.status(403).json({ error: 'Admin account already exists' });
        }

        // Hash the password. Never store plain text passwords in the database!
         const passwordHash = await bcrypt.hash(password, 12); 

         const admin = await prisma.admin.create({
            data: { username, passwordHash }
         });

         res.status(201).json({ message: 'Admin account created', id: admin.id });
        } catch (err) {
            next(err);
            }
});


// POST /api/auth/login -- get a JWT token
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body; 

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Find the admin by username
        const admin = await prisma.admin.findUnique({where: { username }});
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the password they typed with the stored hash
        const valid = await bcrypt.compare(password, admin.passwordHash); 
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' }); 
        }

        // Create a signed token that expires in 24 hours
        const token = jwt.sign(
            { id: admin.id, username: admin.username }, 
            process.env.JWT_SECRET,  
            { expiresIn: '24h' }
        );

        res.json({token, username: admin.username }); 
    } catch (err) {
        next(err); 
    }
}); 