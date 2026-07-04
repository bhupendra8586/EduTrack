const ASSIGNMENT = require("../models/assignment");
const TEACHER = require("../models/teachers");


async function createAssignment(req, res) {
  try {
    const teacherUserId = req.user.id;

    const teacher = await TEACHER.findOne({ userId: teacherUserId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const {
      title,
      description,
      subject,
      dueDate
    } = req.body;

    const assignment = await ASSIGNMENT.create({
      title,
      description,
      subject,
      dueDate,
      teacherId: teacher._id,
      yearId: teacher.yearId
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment
    });

  } catch (error) {
    console.log("Error(createAssignment):", error);
    res.status(500).json({ message: "Server error" });
  }
}



async function getAssignments(req, res) {
  try {
    const teacherUserId = req.user.id;

    const teacher = await TEACHER.findOne({ userId: teacherUserId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const assignments = await ASSIGNMENT.find({
      yearId: teacher.yearId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Assignments fetched successfully",
      assignments
    });

  } catch (error) {
    console.log("Error(getAssignments):", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateAssignment(req, res) {
  try {
    const { assignmentId } = req.params;

    const updated = await ASSIGNMENT.findByIdAndUpdate(
      assignmentId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment: updated
    });

  } catch (error) {
    console.log("Error(updateAssignment):", error);
    res.status(500).json({ message: "Server error" });
  }
}





async function deleteAssignment(req, res) {
  try {
    const { assignmentId } = req.params;

    const deleted = await ASSIGNMENT.findByIdAndDelete(assignmentId);

    if (!deleted) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment deleted successfully",
      assignment: deleted
    });

  } catch (error) {
    console.log("Error(deleteAssignment):", error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment
};