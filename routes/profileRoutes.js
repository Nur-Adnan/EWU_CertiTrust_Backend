const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

router.put("/update", async (req, res) => {
  const { name, role, phone, address, bio, photoUrl } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { name, role, phone, address, bio, photoUrl },
      { new: true, upsert: false }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
