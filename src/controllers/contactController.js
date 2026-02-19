const ParentalContact = require('../models/ParentalContact');

// Add parental contacts
exports.addContacts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { contactNumbers } = req.body;

    const safeContactNumbers = Array.isArray(contactNumbers) ? contactNumbers : [];

    // Check if contacts already exist for this user
    let parentalContact = await ParentalContact.findOne({ userId });

    if (parentalContact) {
      // Update existing contacts
      parentalContact.contactNumbers = safeContactNumbers;
      parentalContact.updatedAt = Date.now();
      await parentalContact.save();
    } else {
      // Create new contacts
      parentalContact = await ParentalContact.create({
        userId,
        contactNumbers: safeContactNumbers
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get parental contacts
exports.getContacts = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(200).json({
        success: true,
        message: 'No contacts found for this user',
        data: {
          userId: null,
          contactNumbers: []
        }
      });
    }

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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
