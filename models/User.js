const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  publicAddress: {
    type: String,
    required: false,
    default: null,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "student", "examController", "faculty"],
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  photoUrl: {
    type: String,
    default: "/placeholder.svg?height=100&width=100",
  },
  department: {
    type: String,
    enum: [
      "CSE",
      "BBA",
      "EEE",
      "English",
      "Economics",
      "Physics",
      "Chemistry",
      "Mathematics",
      "Psychology",
      "Biology",
      "History",
      "Political Science",
      "Sociology",
      "Philosophy",
      "Law",
      "Architecture",
      "Mechanical Engineering",
      "Civil Engineering",
      "Business Administration",
      "Graphic Design",
    ],
    default: null,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", function (next) {
  if (this.role !== "faculty") {
    this.department = null;
  }
  next();
});

UserSchema.methods.canAccessDashboard = function () {
  if (!this.isApproved) {
    throw new Error(
      "Please try again. Your email has not yet been approved by the university."
    );
  }
  return true;
};

module.exports = mongoose.model("User", UserSchema);
