const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/examcontrollerlist", async (req, res) => {
  try {
    const examControllerUsers = await User.find(
      { role: "examController" },
      "name email address isApproved"
    );
    res.status(200).json(examControllerUsers);
  } catch (error) {
    console.error("Error fetching exam controllers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/examcontroller/:email", async (req, res) => {
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

router.delete("/exam/examcontroller/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Request to delete email:", req.params.email);
    const deletedController = await ExamController.findOneAndDelete({ email });

    if (!deletedController) {
      return res.status(404).json({ message: "Exam controller not found" });
    }

    res.status(200).json({ message: "Exam controller deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
