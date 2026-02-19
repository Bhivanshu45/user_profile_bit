const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://bhivanshulawaniya6_db_user:PNvAsYDo4LpUs1Q7@cluster0.cvjflnx.mongodb.net/bit_by_bit');
    console.log('✓ MongoDB connected successfully');
    
    // Drop old mobileNumber index if exists
    try {
      const db = mongoose.connection.db;
      await db.collection('users').dropIndex('mobileNumber_1');
      console.log('✓ Dropped old mobileNumber index');
    } catch (err) {
      // Index doesn't exist, ignore
    }
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
