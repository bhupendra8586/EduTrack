//"/admin"
const Router = require("express");
const router = Router();

const { 
    addStudent,
    readStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    readTeacher,
    updateTeacher,
    deleteTeacher,
    addYear,
    getAllStudents,
    getAllTeachers,
    assignYearToStudent,
    adminDashboard
} = require("../controllers/admin");

const authenticateUser = require("../middlewares/authenticateUser");
const {role} = require("../middlewares/roleMiddleware");

// CRUD students
router.post("/students/add", authenticateUser, role("admin"), addStudent); //Create
router.get("/students", authenticateUser, role("admin"), getAllStudents); //Read(all)
router.get("/students/:studentId", authenticateUser, role("admin"), readStudent); //Read(single)
router.put("/students/:studentId", authenticateUser, role("admin"), updateStudent); //Update
router.delete("/students/:studentId", authenticateUser, role("admin"), deleteStudent); //Delete

// CRUD teachers
router.post("/teachers/add", authenticateUser, role("admin"), addTeacher); //Create
router.get("/teachers", authenticateUser, role("admin"), getAllTeachers); //Real(all)
router.get("/teachers/:teacherId", authenticateUser, role("admin"), readTeacher); //Read(single)
router.put("/teachers/:teacherId", authenticateUser, role("admin"), updateTeacher); //Update
router.delete("/teachers/:teacherId", authenticateUser, role("admin"), deleteTeacher); //Delete


//add academic year
router.post("/add-year", authenticateUser, role("admin"), addYear);


// assign year to student
router.put("/students/:studentId/assign-year", authenticateUser, role("admin"), assignYearToStudent);



router.get("/dashboard", authenticateUser, role("admin"), adminDashboard);


module.exports = router;