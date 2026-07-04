const { Schema, model, mongoose } = require("mongoose");

const markSchema = new Schema({
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
    subject: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const MARKS = model("mark", markSchema);

module.exports = MARKS;