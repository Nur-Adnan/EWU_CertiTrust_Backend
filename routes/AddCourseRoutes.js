const express = require("express");
const router = express.Router();
const Course = require("../models/AddCourse");
router.post("/courses", async (req, res) => {
  try {
    const { courseName, courseId, credit } = req.body;
    console.log("Received course data:", { courseName, courseId, credit });

    const newCourse = new Course({
      courseName,
      courseId,
      credit: Number(credit),
    });

    const savedCourse = await newCourse.save();
    console.log("Course saved successfully:", savedCourse);

    res
      .status(201)
      .json({ message: "Course saved successfully", course: savedCourse });
  } catch (error) {
    console.error("Error saving course:", error);
    res
      .status(500)
      .json({ message: "Error saving course", error: error.toString() });
  }
});

module.exports = router;
