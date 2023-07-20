const pool = require("../pool");

const projectLibraryController = (req, res) => {
  pool.query("SELECT * FROM project;", function (err, result) {
    if (err) return console.log(err);
    console.log(result);
    res.send(result);
  });
};

module.exports = projectLibraryController;

//Luis' 1st end point for Project Library Page. Fetches all data stored in project table from remote server
