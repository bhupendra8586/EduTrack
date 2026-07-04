//"/student"
const router = require("express").Router();
const {
  getMyProfile,
  getMyAttendance,
  getMyMarks,
  getFeeStatus,
  payFees
} = require("../controllers/student");

const { getStudentDashboard } = require("../controllers/studentController");

const authenticateUser = require("../middlewares/authenticateUser");
const { role } = require("../middlewares/roleMiddleware");


router.get("/me", authenticateUser, role("student"), getMyProfile);
router.get("/attendance", authenticateUser, role("student"), getMyAttendance);
router.get("/marks", authenticateUser, role("student"), getMyMarks);

router.get("/fees", authenticateUser, role("student"), getFeeStatus);
router.put("/pay-fees", authenticateUser, role("student"), payFees);


router.get(
  "/dashboard",
  authenticateUser,
  role("student"),
  getStudentDashboard
);






module.exports = router;