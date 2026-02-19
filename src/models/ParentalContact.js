const mongoose = require('mongoose');

const parentalContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  contactNumbers: [{
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Each contact must be a valid 10-digit number']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ParentalContact', parentalContactSchema);
