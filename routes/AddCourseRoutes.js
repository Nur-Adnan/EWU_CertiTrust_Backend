const express = require("express");
const router = express.Router();
const Course = require("../models/AddCourse");
router.post("/api/courses", async (req, res) => {
  try {
    const { courseName, courseId, credit } = req.body;

    const newCourse = new Course({
      courseName,
      courseId,
      credit: Number(credit),
    });

    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course saved successfully", course: newCourse });
  } catch (error) {
    console.error("Error saving course:", error);
    res
      .status(500)
      .json({ message: "Error saving course", error: error.message });
  }
});

module.exports = router;
