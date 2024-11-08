const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    enum: ["fall2023", "spring2024", "summer2024"],
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 2023,
  },
  courseCode: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    enum: [
      "A+",
      "A",
      "A-",
      "B+",
      "B",
      "B-",
      "C+",
      "C",
      "C-",
      "D+",
      "D",
      "D-",
      "F",
    ],
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Grade", gradeSchema);
