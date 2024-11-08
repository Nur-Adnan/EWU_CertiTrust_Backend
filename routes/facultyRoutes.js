const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/facultylist", async (req, res) => {
  try {
    const facultyUsers = await User.find(
      { role: "faculty" },
      "name email department address isApproved"
    );
    res.status(200).json(facultyUsers);
  } catch (error) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/facult/:email", async (req, res) => {
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
