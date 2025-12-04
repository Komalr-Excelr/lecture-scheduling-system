const db = require('../config/database');

module.exports = {
    create: async (name, level, description) => {
        const [result] = await db.query(
            'INSERT INTO courses (name, level, description) VALUES (?, ?, ?)',
            [name, level, description]
        );
        return result.insertId;
    },
    
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM courses');
        return rows;
    }
};