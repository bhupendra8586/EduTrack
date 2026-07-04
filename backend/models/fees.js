const { Schema, model, mongoose } = require("mongoose");

const feesSchema = new Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    dueAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Paid", "Partial", "Unpaid"],
      default: "Unpaid"
    },
    paymentDate: {
      type: Date
    }
});

const FEES = model("fee", feesSchema);

module.exports = FEES;