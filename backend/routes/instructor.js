const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { isInstructor } = require('../middleware/auth');

// Login Page
router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/instructor/dashboard');
    res.render('instructor/login');
});

// Login Process
router.post('/login', async (req, res) => {
    const { email } = req.body;
    
    try {
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ? AND role = "instructor"',
            [email]
        );
        
        if (users.length === 0) {
            req.flash('error', 'Instructor not found');
            return res.redirect('/instructor/login');
        }
        
        req.session.user = users[0];
        req.flash('success', 'Login successful!');
        res.redirect('/instructor/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Server error');
        res.redirect('/instructor/login');
    }
});

// Dashboard
router.get('/dashboard', isInstructor, async (req, res) => {
    try {
        const [lectures] = await db.query(`
            SELECT l.*, c.name as course_name, c.level 
            FROM lectures l 
            JOIN courses c ON l.course_id = c.id 
            WHERE l.instructor_id = ? 
            ORDER BY l.lecture_date ASC
        `, [req.session.user.id]);
        
        res.render('instructor/dashboard', {
            lectures
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error loading lectures');
        res.redirect('/instructor/dashboard');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/instructor/login');
});

module.exports = router;