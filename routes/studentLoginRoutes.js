const studentLoginController = require("../controllers/studentLoginController");
const express = require("express");
const router = express.Router();

router.post("/api/loginStudent", studentLoginController);

module.exports = router;
