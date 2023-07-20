const teacherLoginController = require("../controllers/teacherLoginController");
const express = require("express");
const router = express.Router();

router.post("/api/loginTeacher", teacherLoginController);

module.exports = router;
