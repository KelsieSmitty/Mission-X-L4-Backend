const pool = require("../pool");

const studentSignupController = (req, res) => {
  const query = `INSERT INTO student (name, email, password) VALUES (?, ?, ?);`;
  pool.execute(
    query,
    [req.body.name, req.body.email, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      if (result.affectedRows === 1) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    }
  );
};

module.exports = studentSignupController;
