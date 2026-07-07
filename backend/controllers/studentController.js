const STUDENT = require("../models/students");
const ASSIGNMENT = require("../models/assignment");
const MARKS = require("../models/marks");
const YEAR = require("../models/year");
const ATTENDANCE = require("../models/attendance");

async function getStudentDashboard(req, res) {
  try {
    const userId = req.user.id;

    // Get student profile
    const student = await STUDENT.findOne({ userId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Assignments
    const assignments = await ASSIGNMENT.find({
      yearId: student.yearId
    });

    // Marks
    const marks = await MARKS.find({
      studentId: student._id
    });

    // Attendance
    const attendance = await ATTENDANCE.find({
      studentId: student._id
    }).sort({ date: -1 });

    res.status(200).json({
      student,
      attendance,
      assignments,
      marks
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}



module.exports = {
  getStudentDashboard
  // getAttendanceByStudent
};