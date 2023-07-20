// Module Imports
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

// Enable express
const app = express();

// Middlewares
app.use(cors("http://localhost:3000"));

//routes

const projectLibraryRoutes = require("./routes/projectLibraryRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use(projectLibraryRoutes);
app.use(studentRoutes);

const port = process.env.PORT;
app.listen(port, () => 
    console.log(`Listening at http://localhost:${port}`)
  )
  .on("error", (error) => console.error(error));
