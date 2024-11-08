const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      courseName: String,
    },
  ],
  submittedGrades: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      grade: String,
      submissionDate: Date,
      approved: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Faculty", facultySchema);
