const mongoose = require("mongoose");
const assignCourseSchema = new mongoose.Schema({
  courseId: String,
  sectionId: String,
  publicAddress: String,
  maxStudent: Number,
});

module.exports = mongoose.model("assignCourse", assignCourseSchema);
