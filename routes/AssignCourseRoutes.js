const express = require("express");
const router = express.Router();
const Course = require("../models/AssignCourse");
router.post("/assign-courses", async (req, res) => {
  try {
    const { courseId, sectionId, publicAddress, maxStudent } = req.body;

    const newCourse = new Course({
      courseId,
      sectionId,
      publicAddress,
      maxStudent: Number(maxStudent),
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
