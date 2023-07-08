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

// Default endpoint
app.get("/", (req, res) => {
  res.send("Hey the remote server for mission X is working!!!.");
});

//Testing endpoint to fetch all student's data from server
app.get("/api/students", (req, res) => {
  pool.query( "SELECT * FROM `missio20_202305-team4`.student;",
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      res.send(result);
    }
  );
});

// end point only fetches a single student according to their student id
app.get("/api/students/:id", (req, res) => {
  const studentId = req.params.id;
  console.log(studentId);
  pool.query(`SELECT * FROM \`missio20_202305-team4\`.student WHERE student_id = '${studentId}'`,
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
