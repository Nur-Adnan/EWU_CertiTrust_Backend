// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const magic = require("./../utils/MagicBackend");

// Route to create a new user
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
      department: role === "faculty" ? department : null, // Set department only if role is faculty
      isApproved: false, // Default to not approved on creation
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

// Route to get user profile by email
router.get("/profile", async (req, res) => {
  const { email } = req.query;
  console.log(email);

  try {
    const user = await User.findOne(
      { email },
      "name role phone address bio photoUrl department"
    ); // Include department in response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Route to update user profile
router.put("/profile/update", async (req, res) => {
  const { email, name, phone, address, bio, photoUrl, department } = req.body;

  try {
    const updateFields = { name, phone, address, bio, photoUrl };

    // Conditionally include department if the role is faculty
    const user = await User.findOne({ email });
    if (user) {
      if (user.role === "faculty" && department) {
        updateFields.department = department;
      } else {
        updateFields.department = null; // Ensure non-faculty users don’t have department set
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

// Route to get users with isApproved: false
// routes/userRoutes.js

router.get("/pending-approvals", async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false })
      .select("_id name email role publicAddress")
      .lean();

    // Map _id to id for frontend compatibility
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

// Route to approve a user
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

// Route to delete (reject) a user
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

// Get user role
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

// Get user role
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

router.post("/request-approval", async (req, res) => {
  const { publicAddress } = req.body;
  console.log(publicAddress);

  try {
    const userMetadata = await magic.users.getMetadataByPublicAddress(
      publicAddress
    );
    console.log(userMetadata);

    if (!userMetadata) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateUser = await User.findOneAndUpdate(
      { email: userMetadata.email },
      { publicAddress: publicAddress },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.error("Error getting role:", error);
    res.status(500).json({ error: "Error getting role" });
  }
});

module.exports = router;
