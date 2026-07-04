const STUDENT = require("../models/students");
const ASSIGNMENT = require("../models/assignment");
const MARKS = require("../models/marks");

async function getStudentDashboard(req, res) {
  try {
    const userId = req.user.id;

    
    const student = await STUDENT.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // get assignments (by year)
    const assignments = await ASSIGNMENT.find({
      yearId: student.yearId
    });

    // get marks
    const marks = await MARKS.find({
      studentId: student._id
    });

    res.status(200).json({
      student,
      assignments,
      marks
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getStudentDashboard
};