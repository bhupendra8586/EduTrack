const ATTENDANCE = require("../models/attendance");
const TEACHER = require("../models/teachers");

async function markAttendance(req, res) {
  try {
    const teacherUserId = req.user.id;
    const { studentId, date, status } = req.body;

    const teacher = await TEACHER.findOne({ userId: teacherUserId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // check if already marked
    const existing = await ATTENDANCE.findOne({
      studentId,
      date
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked for this date"
      });
    }

    const attendance = await ATTENDANCE.create({
      studentId,
      teacherId: teacher._id,
      date,
      status
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance
    });

  } catch (error) {
    console.log("Error(markAttendance): ", error);
    res.status(500).json({ message: "Server error" });
  }
}



async function updateAttendance(req, res) {
  try {
    const { attendanceId } = req.params;
    const { status } = req.body;

    const attendance = await ATTENDANCE.findByIdAndUpdate(
      attendanceId,
      { status },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json({
      message: "Attendance updated",
      attendance
    });

  } catch (error) {
    console.log("Error(updateAttendance): ", error);
    res.status(500).json({ message: "Server error" });
  }
}


async function getStudentAttendance(req, res) {
  try {
    const { studentId } = req.params;

    const attendance = await ATTENDANCE.find({ studentId })
      .sort({ date: -1 });

    res.status(200).json({
      message: "Attendance fetched",
      attendance
    });

  } catch (error) {
    console.log("Error(getStudentAttendance): ", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAttendanceByStudent(req, res) {
  try {
    const { studentId } = req.params;

    const attendance = await ATTENDANCE.find({ studentId })
      .sort({ date: -1 });

    res.status(200).json({
      attendance
    });

  } catch (error) {
    console.log("Error(getAttendanceByStudent):", error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = {
    markAttendance,
    updateAttendance,
    getStudentAttendance,
    getAttendanceByStudent
}