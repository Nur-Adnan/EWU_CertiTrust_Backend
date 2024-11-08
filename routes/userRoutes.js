const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/create", async (req, res) => {
  const { name, email, role, phone, address, bio, photoUrl, department } =
    req.body;

  try {
    const newUser = new User({
      name,
      email,
      role,
      phone,
      address,
      bio,
      photoUrl,
      department: role === "faculty" ? department : null,
      isApproved: false,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/profile", async (req, res) => {
  const { email } = req.query;
  console.log(email);

  try {
    const user = await User.findOne(
      { email },
      "name role phone address bio photoUrl department"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

router.put("/profile/update", async (req, res) => {
  const { email, name, phone, address, bio, photoUrl, department } = req.body;

  try {
    const updateFields = { name, phone, address, bio, photoUrl };

    const user = await User.findOne({ email });
    if (user) {
      if (user.role === "faculty" && department) {
        updateFields.department = department;
      } else {
        updateFields.department = null;
      }
    }

    const updatedUser = await User.findOneAndUpdate({ email }, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

router.get("/pending-approvals", async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false })
      .select("_id name email role")
      .lean();

    const usersWithId = pendingUsers.map((user) => ({
      ...user,
      id: user._id.toString(),
    }));

    res.status(200).json(usersWithId);
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    res.status(500).json({ error: "Failed to fetch pending approvals" });
  }
});

router.patch("/:id/approve", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isApproved: true, status: "approved" },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User approved successfully", user });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ error: "Failed to approve user" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User rejected and removed successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.get("/role", async (req, res) => {
  const { email } = req.query;
  console.log(email);

  try {
    const user = await User.findOne({
      email: email,
      isApproved: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User role", role: user.role });
  } catch (error) {
    console.error("Error getting role:", error);
    res.status(500).json({ error: "Error getting role" });
  }
});

router.get("/is-exist-role", async (req, res) => {
  const { email } = req.query;
  console.log(email);

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User role", role: user.role });
  } catch (error) {
    console.error("Error getting role:", error);
    res.status(500).json({ error: "Error getting role" });
  }
});

module.exports = router;
