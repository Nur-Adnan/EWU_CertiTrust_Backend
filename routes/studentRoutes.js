const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/studentlist", async (req, res) => {
  try {
    const studentUsers = await User.find(
      { role: "student" },
      "name email address enrollmentHistory earnedCredits isApproved"
    );
    res.status(200).json(studentUsers);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/student/:email", async (req, res) => {
  const { email } = req.params;
  const { isApproved } = req.body;

  try {
    await User.updateOne({ email }, { isApproved });
    res.status(200).json({ message: "Approval status updated" });
  } catch (error) {
    console.error("Error updating approval status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
