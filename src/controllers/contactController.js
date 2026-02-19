const ParentalContact = require('../models/ParentalContact');
const User = require('../models/User');

// Add parental contacts
exports.addContacts = async (req, res, next) => {
  try {
    const { userId, contactNumbers } = req.body;

    // Validate input
    if (!userId || !contactNumbers || !Array.isArray(contactNumbers)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide userId and contactNumbers (as array)'
      });
    }

    if (contactNumbers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one contact number is required'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if contacts already exist for this user
    let parentalContact = await ParentalContact.findOne({ userId });

    if (parentalContact) {
      // Update existing contacts
      parentalContact.contactNumbers = contactNumbers;
      parentalContact.updatedAt = Date.now();
      await parentalContact.save();
    } else {
      // Create new contacts
      parentalContact = await ParentalContact.create({
        userId,
        contactNumbers
      });
    }

    res.status(201).json({
      success: true,
      message: 'Parental contacts saved successfully',
      data: {
        userId: parentalContact.userId,
        contactNumbers: parentalContact.contactNumbers,
        createdAt: parentalContact.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get parental contacts
exports.getContacts = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find parental contacts
    const parentalContact = await ParentalContact.findOne({ userId });

    if (!parentalContact) {
      return res.status(200).json({
        success: true,
        message: 'No contacts found for this user',
        data: {
          userId,
          contactNumbers: []
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Parental contacts retrieved successfully',
      data: {
        userId: parentalContact.userId,
        contactNumbers: parentalContact.contactNumbers,
        createdAt: parentalContact.createdAt,
        updatedAt: parentalContact.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};
