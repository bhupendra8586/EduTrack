const Router = require("express");
const router = Router();

const { getMyStudents } = require("../controllers/teacher");

const authenticateUser = require("../middlewares/authenticateUser");
const { role } = require("../middlewares/roleMiddleware");



router.get("/students", authenticateUser, role("teacher"), getMyStudents);

module.exports = router;