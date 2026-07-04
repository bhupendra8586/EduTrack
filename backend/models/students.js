const { Schema, model, mongoose } = require("mongoose");

const student_schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "year",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    }
}, { timestamps: true });

const STUDENT = model("student", student_schema);

module.exports = STUDENT;