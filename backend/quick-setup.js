const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lecture123'
});

const sql = `
CREATE DATABASE IF NOT EXISTS lecture_scheduler;
USE lecture_scheduler;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'instructor') DEFAULT 'instructor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    level VARCHAR(50),
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lectures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    instructor_id INT NOT NULL,
    lecture_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_instructor_date (instructor_id, lecture_date),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

INSERT IGNORE INTO users (name, email, password, role) 
VALUES ('Admin', 'admin@example.com', 'admin123', 'admin');

INSERT IGNORE INTO users (name, email, password) 
VALUES 
('Rahul Sharma', 'rahul@example.com', 'instructor123'),
('Priya Singh', 'priya@example.com', 'instructor123'),
('Amit Patel', 'amit@example.com', 'instructor123'),
('Sneha Verma', 'sneha@example.com', 'instructor123');
`;

console.log('Setting up database...');

connection.query(sql, (err) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('✅ Database setup completed!');
        console.log('📊 Tables: users, courses, lectures');
        console.log('👤 Admin: admin@example.com / admin123');
        console.log('👨‍🏫 Instructors: rahul@example.com / instructor123');
    }
    connection.end();
});