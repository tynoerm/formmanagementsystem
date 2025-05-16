import express from "express";
import bcrypt from "bcryptjs"; // Password hashing (optional, but highly recommended)
import usersSchema from "../models/userManagementModal.js";

const router = express.Router();

// REGISTER USER
router.post("/create-user", async (req, res, next) => {
  try {
    const { fullName, username, password, role, department } = req.body;

    // Check if username already exists
    const existingUser = await usersSchema.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersSchema.create({
      fullName,
      username,
      password: hashedPassword,
      role,
      department,
    });

    return res.status(201).json({
      data: user,
      message: "User created successfully",
      status: 201,
    });
  } catch (err) {
    next(err);
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersSchema.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        fullName: user.fullName,
        role: user.role,
        department: user.department,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

export { router as usersRoutes };
