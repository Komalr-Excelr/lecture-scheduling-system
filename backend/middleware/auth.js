module.exports = {
    isAdmin: (req, res, next) => {
        if (req.session.user && req.session.user.role === 'admin') {
            next();
        } else {
            res.redirect('/admin/login');
        }
    },
    
    isInstructor: (req, res, next) => {
        if (req.session.user && req.session.user.role === 'instructor') {
            next();
        } else {
            res.redirect('/instructor/login');
        }
    }
};