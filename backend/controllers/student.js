const ATTENDANCE = require("../models/attendance");
const MARKS = require("../models/marks");
const STUDENT = require("../models/students");

// Get my profile
async function getMyProfile(req, res) {
  try {
    const student = await STUDENT.findOne({ userId: req.user.id })
      .populate("yearId");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json({
      message: "My profile",
      student
    });
  } catch (error) {
    console.log("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get my attendance
async function getMyAttendance(req, res) {
  try {
    const student = await STUDENT.findOne({ userId: req.user.id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const records = await ATTENDANCE.find({ studentId: student._id });

    res.status(200).json({
      message: "My attendance",
      records
    });
  } catch (error) {
    console.log("Get My Attendance Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get my marks
async function getMyMarks(req, res) {
  try {
    const student = await STUDENT.findOne({ userId: req.user.id });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const records = await MARKS.find({ studentId: student._id });

    res.status(200).json({
      message: "My marks",
      records
    });
  } catch (error) {
    console.log("Get My Marks Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}



async function payFees(req, res) {
  try {
    const studentUserId = req.user.id;
    let { amount } = req.body;

    amount = Number(amount); // force number

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a valid number" });
    }

    const student = await STUDENT.findOne({ userId: studentUserId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ensure defaults
    if (!student.fees) {
      student.fees = { total: 0, paid: 0, due: 0 };
    }

    student.fees.paid += amount;
    student.fees.due = student.fees.total - student.fees.paid;

    await student.save();

    res.status(200).json({
      message: "Fees paid successfully",
      fees: student.fees
    });

  } catch (error) {
    console.log("Pay fees error:", error);
    res.status(500).json({ message: "Server error" });
  }

}


async function getFeeStatus(req, res) {
  try {
    const studentId = req.user.id;

    const student = await STUDENT.findOne({ userId: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Fee status",
      fees: student.fees
    });

  } catch (error) {
    console.log("Fee status error:", error);
    res.status(500).json({ message: "Server error" });
  }
}



module.exports = {
  getMyProfile,
  getMyAttendance,
  getMyMarks,
  payFees,
  getFeeStatus
};