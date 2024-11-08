const mongoose = require("mongoose");
const Course = require("./Course");

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  gradeHistory: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      grade: String,
      term: String,
      approved: {
        type: Boolean,
        default: false,
      },
    },
  ],
  certificates: [
    {
      certificateId: mongoose.Schema.Types.ObjectId,
      issueDate: Date,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
