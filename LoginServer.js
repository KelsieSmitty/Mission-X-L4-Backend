// Module Imports
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");
// Enable express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Default endpoint
app.get("/", (req, res) => {
  res.send("Hey the backend is connected.");
});

app.post("/api/loginStudent", (req, res) => {
  console.log(req.body);

  const query = `SELECT student_id, name, email, password FROM student WHERE email = ? AND password = ?;`;
  pool.execute(
    query,
    [req.body.email, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      if (result.length === 0) {
        return res.sendStatus(404);
      }
      if (result) {
        return res.sendStatus(200);
      }
    }
  );
});

app.post("/api/loginTeacher", (req, res) => {
  console.log(req.body);

  const query = `SELECT teacher_id, teacher_name, email, password FROM teacher WHERE email = ? AND password = ?;`;
  pool.execute(
    query,
    [req.body.email, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      if (result.length === 0) {
        return res.sendStatus(404);
      }
      if (result) {
        return res.sendStatus(200);
      }
    }
  );
});

app.post("/api/signupStudent", (req, res) => {
  console.log(req.body);

  const query = `INSERT INTO student (name, email, password) VALUES (?, ?, ?);`;
  pool.execute(
    query,
    [req.body.name, req.body.email, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      if (result.affectedRows === 1) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    }
  );
});

app.post("/api/signupTeacher", (req, res) => {
  console.log(req.body);

  const query = `INSERT INTO teacher (teacher_name, email, password) VALUES (?, ?, ?);`;
  pool.execute(
    query,
    [req.body.teacher_name, req.body.email, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      if (result.affectedRows === 1) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    }
  );
});

const port = process.env.PORT || 4000;
app
  .listen(port, () =>
    console.log(`The server is listening at http://localhost:${port}`)
  )
  .on("error", (error) => console.error(error));
