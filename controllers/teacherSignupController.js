const pool = require("../pool");

const teacherSignupController = (req, res) => {
  const query = `INSERT INTO teacher (teacher_name, email, password) VALUES (?, ?, ?);`;
  pool.execute(
    query,
    [req.body.teacher_name, req.body.email, req.body.password],
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
module.exports = teacherSignupController;
