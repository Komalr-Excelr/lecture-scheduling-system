const db = require('../config/database');

module.exports = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    
    getAllInstructors: async () => {
        const [rows] = await db.query('SELECT id, name, email FROM users WHERE role = "instructor"');
        return rows;
    }
};