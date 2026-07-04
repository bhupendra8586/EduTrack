const { Schema, model, mongoose } = require("mongoose");

const assignment_schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: true
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "year",
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const ASSIGNMENT = model("assignment", assignment_schema);

module.exports = ASSIGNMENT;