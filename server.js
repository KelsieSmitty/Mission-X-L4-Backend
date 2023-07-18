const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
});

app.get('/StudentData', (req, res) => {
    const query = `SELECT * FROM student;`
        connection.query(query, (err, result) => {
            if (err) return console.log(err);
            console.log(result);
            res.send(result)
    });
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if(err) {console.log(err)}
    else console.log (`Server Connected! Listening at http://localhost:${PORT}`)
});

//phoebes code
app.get("/project_excel", (req, res) => {
    
    const sql = `SELECT student.student_id, student.name, GROUP_CONCAT(student_projects.project_id) AS completed_projects, count(date_completed) As completed_projects_count
      FROM student
      LEFT JOIN student_projects ON student.student_id = student_projects.student_id
      AND student_projects.date_completed IS NOT NULL
      GROUP BY student.student_id
      ORDER BY student_id;`;
  
    pool.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    });
  });