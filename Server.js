const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

//routes:

const studentLoginRoutes = require("./routes/studentLoginRoutes");
const studentSignupRoutes = require("./routes/studentSignupRoutes");
const teacherLoginRoutes = require("./routes/teacherLoginRoutes");
const teacherSignupRoutes = require("./routes/teacherSignupRoutes");

app.use(studentLoginRoutes);
app.use(studentSignupRoutes);
app.use(teacherLoginRoutes);
app.use(teacherSignupRoutes);

app.get("/", (req, res) => {
  res.send("The backend is connected.");
});

const port = process.env.PORT || 4000;
app
  .listen(port, () =>
    console.log(`The server is listening at http://localhost:${port}`)
  )
  .on("error", (error) => console.error(error));
