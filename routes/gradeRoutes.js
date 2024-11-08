const express = require("express");
const Grade = require("../models/Grade");
const router = express.Router();

router.post("/submission", async (req, res) => {
  const { studentId, semester, year, courseCode, grade } = req.body;

  if (!studentId || !semester || !year || !courseCode || !grade) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newGrade = new Grade({
      studentId,
      semester,
      year,
      courseCode,
      grade,
    });
    await newGrade.save();
    res.status(201).json({ message: "Grade submitted successfully" });
  } catch (error) {
    console.error("Error saving grade:", error);
    res.status(500).json({ error: "Failed to submit grade" });
  }
});

router.get("/pending-approvals", async (req, res) => {
  try {
    const pendingGrades = await Grade.find({ approved: false }).lean();
    const gradesWithId = pendingGrades.map((grade) => ({
      ...grade,
      id: grade._id.toString(),
    }));

    res.status(200).json(gradesWithId);
  } catch (error) {
    console.error("Error fetching pending grades:", error);
    res.status(500).json({ error: "Failed to fetch pending grades" });
  }
});

router.patch("/:id/approve", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedGrade = await Grade.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!updatedGrade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    res
      .status(200)
      .json({ message: "Grade approved successfully", grade: updatedGrade });
  } catch (error) {
    console.error("Error approving grade:", error);
    res.status(500).json({ error: "Failed to approve grade" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGrade = await Grade.findByIdAndDelete(id);
    if (!deletedGrade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    res
      .status(200)
      .json({ message: "Grade rejected and removed successfully" });
  } catch (error) {
    console.error("Error deleting grade:", error);
    res.status(500).json({ error: "Failed to delete grade" });
  }
});

module.exports = router;
