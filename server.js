// Module Imports
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

// Enable express
const app = express();

// Middlewares
app.use(cors("http://localhost:3000"));

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// Luis' 2nd end point for Student Profile Viewer. Fetches a single student along with teacher name, dynamically by changing student ID
app.get("/api/student_teacher/:id", (req, res) => {
  const studentId = req.params.id;
  console.log(studentId);
  pool.query(
    `SELECT student.*, teacher.teacher_name FROM student JOIN teacher ON student.teacher_id = teacher.teacher_id WHERE student_id = ?`,[studentId],
    (err, result) => {
      res.send(result);
    }
  );
});

const port = process.env.PORT;
app
  .listen(port, () =>
    console.log(`Listening at http://localhost:${port} I see you baby!--Groove Armada---`)
  )
  .on("error", (error) => console.error(error));
