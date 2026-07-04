const { Schema, model, mongoose } = require("mongoose");

const teacherSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "year"
    },
    subjectAssigned: [
        {
            semester: Number,
            subject: String
        }
    ]
});

const TEACHER = model("teacher", teacherSchema);

module.exports = TEACHER;