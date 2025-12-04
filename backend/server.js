const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Global variables
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Import routes
const adminRoutes = require('./routes/admin');
const instructorRoutes = require('./routes/instructor');

// Use routes
app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);

// Home page
app.get('/', (req, res) => {
    res.redirect('/admin/login');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
    console.log(`🔗 Admin: http://localhost:${PORT}/admin/login`);
    console.log(`👨‍🏫 Instructor: http://localhost:${PORT}/instructor/login`);
});