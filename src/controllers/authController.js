const User = require('../models/User');

// Signup - Create new user
exports.signup = async (req, res, next) => {
  try {
    const { fullName, age, gender } = req.body;

    // Create new user
    const user = await User.create({
      fullName,
      age,
      gender
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: user._id,
        fullName: user.fullName,
        age: user.age,
        gender: user.gender
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login - Authenticate user (COMMENTED OUT)
// exports.login = async (req, res, next) => {
//   try {
//     const { mobileNumber, password } = req.body;

//     // Validate input
//     if (!mobileNumber || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide mobile number and password'
//       });
//     }

//     // Find user by mobile number
//     const user = await User.findOne({ mobileNumber });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid mobile number or password'
//       });
//     }

//     // Validate password (basic comparison - no hashing for prototype)
//     if (user.password !== password) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid mobile number or password'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         userId: user._id,
//         name: user.name,
//         mobileNumber: user.mobileNumber
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };
