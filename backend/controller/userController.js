const User = require("../model/userModel.js");
const jwt = require("jsonwebtoken");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("Registration request body:", req.body); // Debug log

    const { userName, email, password, role } = req.body;

    // Validate required fields
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Please provide userName, email, and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    // Set default role if not provided
    const userRole = role || "customer";

    const newUser = await User.create({
      userName,
      email,
      password,
      role: userRole,
    });

    console.log("User created successfully:", newUser._id); // Debug log

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    // Generate JWT token for immediate login after registration
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Don't send password back
    const userResponse = {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({
      message: "User created successfully",
      token,
      data: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error); // Debug log
    res.status(500).json({
      message: "Server Error",
      error: error.message,
      details: error.toString(),
    });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    console.log("Login request body:", req.body); // Debug log

    const { userOrEmail, password } = req.body;

    if (!userOrEmail || !password) {
      return res.status(400).json({
        message: "Please provide userOrEmail and password",
      });
    }

    const user = await User.findOne({
      $or: [{ userName: userOrEmail }, { email: userOrEmail }],
    });

    console.log("User found:", user ? user._id : "not found"); // Debug log

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);

    console.log("Password valid:", isPasswordValid); // Debug log

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error); // Debug log
    res.status(500).json({
      message: "Server Error",
      error: error.message,
      details: error.toString(),
    });
  }
};
