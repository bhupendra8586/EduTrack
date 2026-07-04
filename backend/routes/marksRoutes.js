//"/auth"
const Router = require("express");
const router = Router();

const authenticateUser = require("../middlewares/authenticateUser");
const { role } = require("../middlewares/roleMiddleware");

const { addMarks, getStudentMarks, getAllMarks, updateMarks, deleteMarks } = require("../controllers/marksController");

// teacher only
router.post("/add", authenticateUser, role("teacher"), addMarks);

router.get("/student/:studentId", authenticateUser, role("teacher"), getStudentMarks);

router.get("/", authenticateUser, role("teacher"), getAllMarks);

router.put("/:marksId", authenticateUser, role("teacher"), updateMarks);

router.delete("/:marksId", authenticateUser, role("teacher"), deleteMarks);

module.exports = router;