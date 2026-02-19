const User = require('../models/User');

// Get user details by userId
exports.getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User details retrieved successfully',
      data: {
        userId: user._id,
        name: user.name,
        age: user.age,
        mobileNumber: user.mobileNumber,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};
