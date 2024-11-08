const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: String,
  courseId: String,
  credit: Number,
});

module.exports = mongoose.model("Course", courseSchema);
