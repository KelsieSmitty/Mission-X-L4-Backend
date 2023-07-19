const pool = require("../pool");

const studentLoginController = (req, res) => {
  const query = `SELECT student_id, name, email, password FROM student WHERE email = ? AND password = ?;`;
  pool.execute(
    query,
    [req.body.email, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      if (result.length === 0) {
        // if the result is empty - send error message
        return res.sendStatus(404);
      }

      //take the first user that matches email & pw
      const user = result[0];

      const profilePic = "SELECT profile_pic FROM student WHERE email = ?";
      // fetch profile pic using email as parameter

      pool.execute(profilePic, [user.email], function (err, profilePicResult) {
        if (err) return console.log(err);
        //if no pic found - send error
        if (profilePicResult.length === 0) {
          return;
        }
        //take/assign the first profile pic that matches the email result
        const profile_pic = profilePicResult[0].profile_pic;
        //create new object with all user properties + profile pic
        const userDataWithProfilePic = {
          ...user,
          profile_pic,
        };

        return res.status(200).json(userDataWithProfilePic);
      });
    }
  );
};

module.exports = studentLoginController;
