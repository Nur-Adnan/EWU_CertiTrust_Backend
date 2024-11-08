const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: String,
  courseId: String,
  credit: Number,
});

const Course = mongoose.model("Course", courseSchema);
