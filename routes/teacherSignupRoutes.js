const teacherSignupController = require("../controllers/teacherSignupController");
const express = require("express");
const router = express.Router();

router.post("/api/signupTeacher", teacherSignupController);

module.exports = router;
