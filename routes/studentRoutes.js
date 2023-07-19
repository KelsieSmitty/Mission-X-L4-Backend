const studentController = require ("../controllers/studentController");
const express = require("express");
const router = express.Router();

router.get("/api/student_teacher/:id", studentController)

module.exports = router;