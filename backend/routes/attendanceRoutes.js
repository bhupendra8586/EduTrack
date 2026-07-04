const Router = require("express");
const router = Router();

const authenticateUser = require("../middlewares/authenticateUser");
const { role } = require("../middlewares/roleMiddleware");

const {
  markAttendance,
  updateAttendance,
  getStudentAttendance
} = require("../controllers/attendance");


router.post("/mark", authenticateUser, role("teacher"), markAttendance);
router.put("/:attendanceId", authenticateUser, role("teacher"), updateAttendance);
router.get("/:studentId", authenticateUser, role("teacher"), getStudentAttendance);


module.exports = router;