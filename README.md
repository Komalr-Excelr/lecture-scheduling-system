

✨ Features
Admin Panel
📋 View all instructors

➕ Add new courses

📅 Schedule lectures with instructors

⚡ Auto-clash prevention - No same instructor on same date

👁️ View all scheduled lectures

Instructor Panel
👨‍🏫 View assigned lectures

📅 See course schedule

📱 Responsive dashboard

🚀 Quick Start
1. Clone & Setup
bash
git clone https://github.com/Komalr-Excelr/lecture-scheduling-system.git
cd lecture-scheduler/backend
npm install

2. Setup Database
Run SQL commands in MySQL:

sql
CREATE DATABASE lecture_scheduler;
USE lecture_scheduler;

-- Run SQL from setup-database.js

3. Configure Environment
bash
# Create .env file in backend/
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Lecture123
DB_NAME=lecture_scheduler
SESSION_SECRET=your_secret_key


4. Run the App
bash
npm run dev

5. Access URLs
🌐 Admin: http://localhost:3000/admin/login

Email: admin@example.com

Password: admin123

👨‍🏫 Instructor: http://localhost:3000/instructor/login

Select your email from list

📁 Project Structure
text
backend/        # Node.js + Express server
├── config/     # Database configuration
├── routes/     # API routes
├── models/     # Database models
└── server.js   # Main server file

frontend/       # EJS templates
├── views/      # HTML templates
└── public/     # CSS/JS files
🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MySQL

Frontend: EJS, Bootstrap 5

Authentication: express-session

Styling: Font Awesome, Custom CSS

📊 Database Schema
sql
-- Users table
CREATE TABLE users (id, name, email, password, role);

-- Courses table  
CREATE TABLE courses (id, name, level, description);

-- Lectures table (with UNIQUE constraint for clash prevention)
CREATE TABLE lectures (
    id, course_id, instructor_id, lecture_date,
    UNIQUE KEY unique_instructor_date (instructor_id, lecture_date)
);


🔧 Key Features
✅ Clash Prevention - MySQL UNIQUE constraint prevents scheduling conflicts

✅ Role-based Access - Separate admin & instructor panels

✅ Responsive UI - Works on all devices

✅ Session Management - Secure authentication

✅ Error Handling - User-friendly messages



🧪 Test Cases
Assign lecture to Rahul on Dec 20 → Success

Assign another lecture to Rahul on Dec 20 → ❌ Error

Assign lecture to Priya on Dec 20 → Success

Login as Rahul → See only Rahul's lectures



🚀 Server running: http://localhost:3000
🔗 Admin: http://localhost:3000/admin/login
👨‍🏫 Instructor: http://localhost:3000/instructor/login
✅ MySQL Connected!
