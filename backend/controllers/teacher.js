const TEACHER = require("../models/teachers");
const STUDENT = require("../models/students");


async function getMyStudents(req, res) {
  try {
    const teacherUserId = req.user.id;

    
    const teacher = await TEACHER.findOne({ userId: teacherUserId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    
    const students = await STUDENT.find({ yearId: teacher.yearId })
      .populate("userId", "name email");

    res.status(200).json({
      message: "Students fetched successfully",
      students
    });

  } catch (error) {
    console.log("Error(getMyStudents): ", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getMyStudents
};