const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const examControllerRoutes = require("./routes/examControllerRoutes");
const gradeRoutes = require("./routes/gradeRoutes");

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/examController", examControllerRoutes);
app.use("/api/grades", gradeRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Blockchain-Based Certificate Verification System API"
  );
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
