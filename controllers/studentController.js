const pool = require("../pool");

const studentController = (req, res) => {
  const studentId = req.params.id;
  pool.query(
    `SELECT student.*, teacher.teacher_name FROM student JOIN teacher ON student.teacher_id = teacher.teacher_id WHERE student_id = ?`,
    [studentId],
    (err, result) => {
      res.send(result);
    }
  );
};

module.exports = studentController;

// Luis' 2nd end point for Student Profile Viewer. Fetches a single student along with teacher name, dynamically by changing student ID
