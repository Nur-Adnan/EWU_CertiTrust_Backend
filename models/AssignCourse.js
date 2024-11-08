const mongoose = require("mongoose");
const assignCourseSchema = new mongoose.Schema({
  courseName: String,
  courseId: String,
  credit: Number,
});

module.exports = mongoose.model("assignCourse", assignCourseSchema);
