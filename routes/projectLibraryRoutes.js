const projectLibraryController = require ("../controllers/projectLibraryController");
const express = require("express");
const router = express.Router();


router.get("/api/project-library/", projectLibraryController)

module.exports = router;