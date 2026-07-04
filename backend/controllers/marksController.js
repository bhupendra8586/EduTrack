const MARKS = require("../models/marks");
const TEACHER = require("../models/teachers");


async function addMarks(req, res) {
  try {
    const teacherUserId = req.user.id;

    const teacher = await TEACHER.findOne({ userId: teacherUserId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const { studentId, subject, marks, semester } = req.body;

    // prevent duplicate marks entry
    const existing = await MARKS.findOne({
      studentId,
      subject,
      semester
    });

    if (existing) {
      return res.status(400).json({
        message: "Marks already added for this subject & semester"
      });
    }

    const newMarks = await MARKS.create({
      studentId,
      subject,
      marks,
      semester,
      teacherId: teacher._id
    });

    res.status(201).json({
      message: "Marks added successfully",
      marks: newMarks
    });

  } catch (error) {
    console.log("Error(addMarks):", error);
    res.status(500).json({ message: "Server error" });
  }
}


async function getStudentMarks(req, res) {
  try {
    const { studentId } = req.params;

    const marks = await MARKS.find({ studentId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Marks fetched",
      marks
    });

  } catch (error) {
    console.log("Error(getStudentMarks):", error);
    res.status(500).json({ message: "Server error" });
  }
}
async function getAllMarks(req, res) {
  try {
    const teacherUserId = req.user.id;

    const teacher = await TEACHER.findOne({ userId: teacherUserId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const marks = await MARKS.find({ teacherId: teacher._id })
      .populate("studentId", "name email");

    res.status(200).json({
      message: "All marks fetched",
      marks
    });

  } catch (error) {
    console.log("Error(getAllMarks):", error);
    res.status(500).json({ message: "Server error" });
  }
}




async function updateMarks(req, res) {
  try {
    const { marksId } = req.params;
    const { marks } = req.body;

    const updated = await MARKS.findByIdAndUpdate(
      marksId,
      { marks },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.status(200).json({
      message: "Marks updated",
      marks: updated
    });

  } catch (error) {
    console.log("Error(updateMarks):", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteMarks(req, res) {
  try {
    const { marksId } = req.params;

    const deleted = await MARKS.findByIdAndDelete(marksId);

    if (!deleted) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.status(200).json({
      message: "Marks deleted",
      marks: deleted
    });

  } catch (error) {
    console.log("Error(deleteMarks):", error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
    addMarks,
    getStudentMarks,
    getAllMarks,
    updateMarks,
    deleteMarks
};