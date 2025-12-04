const db = require('../config/database');

module.exports = {
    create: async (course_id, instructor_id, lecture_date) => {
        // Check for clash
        const [existing] = await db.query(
            'SELECT * FROM lectures WHERE instructor_id = ? AND lecture_date = ?',
            [instructor_id, lecture_date]
        );
        
        if (existing.length > 0) {
            throw new Error('Instructor already has a lecture on this date');
        }

        const [result] = await db.query(
            'INSERT INTO lectures (course_id, instructor_id, lecture_date) VALUES (?, ?, ?)',
            [course_id, instructor_id, lecture_date]
        );
        return result.insertId;
    },
    
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT l.*, c.name as course_name, u.name as instructor_name 
            FROM lectures l 
            JOIN courses c ON l.course_id = c.id 
            JOIN users u ON l.instructor_id = u.id 
            ORDER BY l.lecture_date DESC
        `);
        return rows;
    },
    
    getByInstructor: async (instructorId) => {
        const [rows] = await db.query(`
            SELECT l.*, c.name as course_name, c.level 
            FROM lectures l 
            JOIN courses c ON l.course_id = c.id 
            WHERE l.instructor_id = ? 
            ORDER BY l.lecture_date ASC
        `, [instructorId]);
        return rows;
    }
};