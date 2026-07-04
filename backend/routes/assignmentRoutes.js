const Router = require("express");
const router = Router();

const authenticateUser = require("../middlewares/authenticateUser");
const { role } = require("../middlewares/roleMiddleware");

const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment
} = require("../controllers/assignmentController");


router.post(
  "/create",
  authenticateUser,
  role("teacher"),
  createAssignment
);

router.get(
  "/",
  authenticateUser,
  role("teacher"),
  getAssignments
);

router.put(
  "/:assignmentId",
  authenticateUser,
  role("teacher"),
  updateAssignment
);

router.delete(
  "/:assignmentId",
  authenticateUser,
  role("teacher"),
  deleteAssignment
);

module.exports = router;