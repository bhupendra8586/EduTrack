const USER = require("../models/user");
const STUDENT = require("../models/students");
const TEACHER = require("../models/teachers");
const YEAR = require("../models/year");
const bcrypt = require("bcrypt");

//student
async function addStudent(req, res) {
  try {
    const {
      name,
      email,
      password,
      address,
      contact,
      department,
      year,
      fees
    } = req.body;

    const yearDoc = await YEAR.findOne({
      name: year,
      department
    });

    if (!yearDoc) {
      return res.status(400).json({
        message: "Selected year not found"
      });
    }

    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Student already exists. " });
    }

    // create user with role = student
    const user = await USER.create({
      name,
      email,
      password,
      address,
      contact,
      department,
      year,
      fees,
      role: "student"
    });

    // create student profile
    const student = await STUDENT.create({
      userId: user._id,
      yearId: yearDoc._id,
      name,
      email,
      address,
      contact,
      department,
      fees
    });

    res.status(201).json({
      message: "Student created successfully",
      user,
      student
    });

  } catch (error) {
    console.log("ERROR(addStudent):", error);

    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error,
    });
  }
}
async function getAllStudents(req, res) {
  try {
    const students = await STUDENT.find()
      .populate("userId", "name email role")
      .populate("yearId", "name department academicYear");

    res.status(200).json(students);
  } catch (error) {
    console.log("ERROR(getAllStudents) :", error);
    res.status(500).json({ message: error.message });
  }
}
async function readStudent(req, res) {
  try {
    const { studentId } = req.params;

    const student = await STUDENT.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      msg: "Student found successfully",
      student
    })
  } catch (error) {
    console.log("error(readStudent): ", error);
    res.status(500).json({ message: error.message });
  }
}
async function updateStudent(req, res) {
  try {
    const { studentId } = req.params;   // /update-student/:studentId
    const updatedData = req.body;

    const student = await STUDENT.findByIdAndUpdate(
      studentId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student
    });

  } catch (error) {
    console.log("error(updateStudent): ", error);
    res.status(500).json({ message: error.message });
  }
}
async function deleteStudent(req, res) {
  try {
    const { studentId } = req.params;   // /delete-student/:studentId

    const student = await STUDENT.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student
    });

  } catch (error) {
    console.log("Delete Student Error:", error);
    res.status(500).json({ message: "Server error while deleting student" });
  }
}


//teacher
async function addTeacher(req, res) {
  try {
    const {
      name,
      email,
      password,
      employeeId,
      department,
      year,
      subjectAssigned
    } = req.body;

    const yearDoc = await YEAR.findOne({
      name: year,
      department
    });

    if (!yearDoc) {
      return res.status(400).json({
        message: "Selected year not found"
      });
    }

    // check if user exists
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user with role = teacher
    const user = await USER.create({
      name,
      email,
      password,
      department,
      year,
      subjectAssigned,
      role: "teacher"
    });

    // create teacher profile
    const teacher = await TEACHER.create({
      userId: user._id,
      employeeId,
      name,
      email,
      password,
      department,
      subjectAssigned,
      yearId: yearDoc._id
    });

    res.status(201).json({
      message: "Teacher created successfully",
      user,
      teacher
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getAllTeachers(req, res) {
  try {
    const teachers = await TEACHER.find()
      .populate("userId", "name email role")
      .populate("yearId", "name department academicYear");

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function readTeacher(req, res) {
  try {
    const { teacherId } = req.params;

    const teacher = await TEACHER.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      msg: "Teacher found successfully",
      teacher
    })
  } catch (error) {
    console.log("error(readTeacher): ", error);
    res.status(500).json({ message: error.message });
  }
}
async function updateTeacher(req, res) {
  try {
    const { teacherId } = req.params;   // /update-student/:studentId
    const updatedData = req.body;

    const teacher = await TEACHER.findByIdAndUpdate(
      teacherId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher
    });

  } catch (error) {
    console.log("error(updateTeacher): ", error);
    res.status(500).json({ message: error.message });
  }
}
async function deleteTeacher(req, res) {
  try {
    const { teacherId } = req.params;   // /delete-student/:teacherId

    const teacher = await TEACHER.findByIdAndDelete(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher deleted successfully",
      teacher
    });

  } catch (error) {
    console.log("Delete Teacher Error:", error);
    res.status(500).json({ message: "Server error while deleting teacher" });
  }
}

//add year
async function addYear(req, res) {
  try {
    const { name, department, academicYear } = req.body;

    const year = await YEAR.create({
      yearId: req.user.id,
      name,
      department,
      academicYear
    });

    res.status(201).json({
      message: "Year created successfully",
      year
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//assign year to student
async function assignYearToStudent(req, res) {
  try {
    const { studentId } = req.params;
    const { yearId } = req.body;

    const student = await STUDENT.findByIdAndUpdate(
      studentId,
      { yearId },
      { new: true }
    ).populate("yearId");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Year assigned to student successfully",
      student
    });

  } catch (error) {
    console.log("Assign Year Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}






//admin dashboard
async function adminDashboard(req, res) {
  try {
    const totalStudents = await STUDENT.countDocuments();
    const totalTeachers = await TEACHER.countDocuments();
    const totalYears = await YEAR.countDocuments();

    const students = await STUDENT.find();
    let totalDueFees = 0;

    students.forEach(s => {
      if (s.fees && s.fees.due) {
        totalDueFees += s.fees.due;
      }
    });

    res.status(200).json({
      message: "Admin dashboard data",
      totalStudents,
      totalTeachers,
      totalYears,
      totalDueFees
    });

  } catch (error) {
    console.log("Dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
  addStudent,
  getAllStudents,
  readStudent,
  updateStudent,
  deleteStudent,
  addTeacher,
  getAllTeachers,
  readTeacher,
  updateTeacher,
  deleteTeacher,
  addYear,
  assignYearToStudent,
  adminDashboard
}