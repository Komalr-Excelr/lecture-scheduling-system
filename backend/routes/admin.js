const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { isAdmin } = require('../middleware/auth');

// Login Page
router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/admin/dashboard');
    res.render('admin/login');
});

// Login Process
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ? AND role = "admin"',
            [email]
        );
        
        if (users.length === 0) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/admin/login');
        }
        
        const user = users[0];
        
        // Simple password check for demo
        if (password === 'admin123') {
            req.session.user = user;
            req.flash('success', 'Welcome Admin!');
            res.redirect('/admin/dashboard');
        } else {
            req.flash('error', 'Invalid password');
            res.redirect('/admin/login');
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'Server error');
        res.redirect('/admin/login');
    }
});

// Dashboard
router.get('/dashboard', isAdmin, async (req, res) => {
    try {
        // Get all instructors
        const [instructors] = await db.query(
            'SELECT id, name, email FROM users WHERE role = "instructor"'
        );
        
        // Get all courses
        const [courses] = await db.query('SELECT * FROM courses');
        
        // Get all lectures
        const [lectures] = await db.query(`
            SELECT l.*, c.name as course_name, u.name as instructor_name 
            FROM lectures l 
            JOIN courses c ON l.course_id = c.id 
            JOIN users u ON l.instructor_id = u.id 
            ORDER BY l.lecture_date DESC
        `);
        
        res.render('admin/dashboard', {
            instructors,
            courses,
            lectures
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error loading data');
        res.redirect('/admin/dashboard');
    }
});

// Add Course
router.post('/add-course', isAdmin, async (req, res) => {
    const { name, level, description } = req.body;
    
    try {
        await db.query(
            'INSERT INTO courses (name, level, description) VALUES (?, ?, ?)',
            [name, level, description]
        );
        req.flash('success', 'Course added successfully!');
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error adding course');
        res.redirect('/admin/dashboard');
    }
});

// Assign Lecture
router.post('/assign-lecture', isAdmin, async (req, res) => {
    const { course_id, instructor_id, lecture_date } = req.body;
    
    try {
        // Check for clash
        const [existing] = await db.query(
            'SELECT * FROM lectures WHERE instructor_id = ? AND lecture_date = ?',
            [instructor_id, lecture_date]
        );
        
        if (existing.length > 0) {
            req.flash('error', 'This instructor already has a lecture on this date!');
            return res.redirect('/admin/dashboard');
        }
        
        // Insert lecture
        await db.query(
            'INSERT INTO lectures (course_id, instructor_id, lecture_date) VALUES (?, ?, ?)',
            [course_id, instructor_id, lecture_date]
        );
        
        req.flash('success', 'Lecture assigned successfully!');
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error assigning lecture');
        res.redirect('/admin/dashboard');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;