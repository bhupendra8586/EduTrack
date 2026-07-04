const { Schema, model, mongoose } = require("mongoose");

const attendanceSchema = new Schema({
    studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true
  }
}, { timestamps: true });

const ATTENDANCE = model("attendance", attendanceSchema);

module.exports = ATTENDANCE;