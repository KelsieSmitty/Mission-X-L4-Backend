const pool = require("../pool");

const teacherLoginController = (req, res) => {
  const query = `SELECT teacher_id, teacher_name, email, password FROM teacher WHERE email = ? AND password = ?;`;
  pool.execute(
    query,
    [req.body.email, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      if (result.length === 0) {
        return res.sendStatus(404);
      }
      if (result) {
        return res.sendStatus(200);
      }
    }
  );
};

module.exports = teacherLoginController;
