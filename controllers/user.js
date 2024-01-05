const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "djbjdbjdsb233";

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: "Password cannot be empty",
      });
    }

    
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and confirm password do not match",
      });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      data: name,
      token: token,
      message: "Signup Done",
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      error: "An error occurred while registering the user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user =await User.findOne({ email: { $regex: new RegExp(email, 'i') } });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      token: token,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred while signing in the user",
    });
  }
};

