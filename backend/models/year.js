const { Schema, model, mongoose } = require("mongoose");

const yearSchema = new Schema({
    name: {
      type: String,
      required: true   // e.g. FY, SY, TY
    },
    department: {
      type: String,
      required: true   // e.g. CS, IT, BCA
    },
    academicYear: {
      type: String,
      required: true   // e.g. 2025-2026
    }
});

const YEAR = model("year", yearSchema);

module.exports = YEAR;