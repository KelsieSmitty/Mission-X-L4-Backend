const studentSignupController = require("../controllers/studentSignupController");
const express = require("express");
const router = express.Router();

router.post("/api/signupStudent", studentSignupController);

module.exports = router;
