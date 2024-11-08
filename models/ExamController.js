const mongoose = require("mongoose");

const examControllerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approvalQueue: [
    {
      gradeSubmissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
      status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "pending",
      },
      reviewDate: Date,
    },
  ],
});

module.exports = mongoose.model("ExamController", examControllerSchema);
