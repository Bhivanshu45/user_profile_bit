const User = require('../models/User');

// Signup - Create new user
exports.signup = async (req, res, next) => {
  try {
    const { name, age, mobileNumber, gender, password } = req.body;

    // Validate input
    if (!name || !age || !mobileNumber || !gender || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, age, mobile number, gender, and password'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this mobile number already exists'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      age,
      mobileNumber,
      gender,
      password
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login - Authenticate user
exports.login = async (req, res, next) => {
  try {
    const { mobileNumber, password } = req.body;

    // Validate input
    if (!mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide mobile number and password'
      });
    }

    // Find user by mobile number
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid mobile number or password'
      });
    }

    // Validate password (basic comparison - no hashing for prototype)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid mobile number or password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber
      }
    });
  } catch (error) {
    next(error);
  }
};
