const User = require('../models/User');
const ParentalContact = require('../models/ParentalContact');

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

    const parentalContact = await ParentalContact.findOne({ userId: user._id });

    res.status(200).json({
      success: true,
      message: 'User details retrieved successfully',
      data: {
        userId: user._id,
        fullName: user.fullName,
        age: user.age,
        gender: user.gender,
        parentalContacts: parentalContact?.contactNumbers || [],
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};
