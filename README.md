# User Profile API

A backend API for managing user profiles and parental contacts, built for rapid prototyping and hackathons.

**🌐 Live URL:** `https://user-profile-bit.onrender.com`

## 🚀 Features

- User signup and login (basic authentication)
- User profile management
- Parental contacts storage
- MongoDB Atlas integration
- Deployed on Render

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Environment**: dotenv

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI

# Run development server
npm run dev

# Run production server
npm start
```

---

## 📚 Complete API Documentation

**Base URL:** `https://user-profile-bit.onrender.com`

### **1. Health Check**
```
GET https://user-profile-bit.onrender.com/health
```
**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

### **2. User Signup (Register)**
```
POST https://user-profile-bit.onrender.com/api/auth/signup
Content-Type: application/json
```
**Request Body:**
```json
{
  "name": "John Doe",
  "age": 25,
  "mobileNumber": "9876543210",
  "gender": "Male",
  "password": "password123"
}
```
**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "699743461d29df815dff4e08",
    "name": "John Doe",
    "mobileNumber": "9876543210"
  }
}
```
**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this mobile number already exists"
}
```

---

### **3. User Login**
```
POST https://user-profile-bit.onrender.com/api/auth/login
Content-Type: application/json
```
**Request Body:**
```json
{
  "mobileNumber": "9876543210",
  "password": "password123"
}
```
**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "699743461d29df815dff4e08",
    "name": "John Doe",
    "mobileNumber": "9876543210"
  }
}
```
**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid mobile number or password"
}
```

---

### **4. Get User Details**
```
GET https://user-profile-bit.onrender.com/api/user/{userId}
```
**Example:**
```
GET https://user-profile-bit.onrender.com/api/user/699743461d29df815dff4e08
```
**Success Response (200):**
```json
{
  "success": true,
  "message": "User details retrieved successfully",
  "data": {
    "userId": "699743461d29df815dff4e08",
    "name": "John Doe",
    "age": 25,
    "mobileNumber": "9876543210",
    "gender": "Male",
    "createdAt": "2026-02-20T10:30:00.000Z"
  }
}
```
**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### **5. Add Parental Contacts**
```
POST https://user-profile-bit.onrender.com/api/contacts/add
Content-Type: application/json
```
**Request Body:**
```json
{
  "userId": "699743461d29df815dff4e08",
  "contactNumbers": ["9123456789", "9987654321", "9555666777"]
}
```
**Success Response (201):**
```json
{
  "success": true,
  "message": "Parental contacts saved successfully",
  "data": {
    "userId": "699743461d29df815dff4e08",
    "contactNumbers": ["9123456789", "9987654321", "9555666777"],
    "createdAt": "2026-02-20T10:35:00.000Z"
  }
}
```
**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide userId and contactNumbers (as array)"
}
```

---

### **6. Get Parental Contacts**
```
GET https://user-profile-bit.onrender.com/api/contacts/{userId}
```
**Example:**
```
GET https://user-profile-bit.onrender.com/api/contacts/699743461d29df815dff4e08
```
**Success Response (200):**
```json
{
  "success": true,
  "message": "Parental contacts retrieved successfully",
  "data": {
    "userId": "699743461d29df815dff4e08",
    "contactNumbers": ["9123456789", "9987654321", "9555666777"],
    "createdAt": "2026-02-20T10:35:00.000Z",
    "updatedAt": "2026-02-20T10:35:00.000Z"
  }
}
```
**No Contacts Found (200):**
```json
{
  "success": true,
  "message": "No contacts found for this user",
  "data": {
    "userId": "699743461d29df815dff4e08",
    "contactNumbers": []
  }
}
```

---

## 📋 Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/user/:userId` | Get user details |
| POST | `/api/contacts/add` | Add/Update parental contacts |
| GET | `/api/contacts/:userId` | Get parental contacts |

---

## 🔄 Typical API Flow

1. **Signup** → Get `userId`
2. **Login** → Verify credentials, get `userId`
3. **Get User Details** → Fetch profile using `userId`
4. **Add Contacts** → Save parental contacts for `userId`
5. **Get Contacts** → Retrieve saved contacts

---

## ⚠️ Important Notes

- **First Request Delay:** First API call may take 15-30 seconds (Render free tier wakes up from sleep)
- **Mobile Number Validation:** Must be 10 digits
- **Password:** Minimum 6 characters (plain text - prototype only)
- **Content-Type:** Always use `application/json` for POST requests
- **userId:** Save from signup/login response for subsequent requests

---

## 🚢 Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Add environment variables:
   - `MONGODB_URI`
   - `PORT`
   - `NODE_ENV`
5. Deploy!

## ⚙️ Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
NODE_ENV=development
```

## 📁 Project Structure

```
src/
├── config/          # Database configuration
├── models/          # Mongoose schemas
├── controllers/     # Business logic
├── routes/          # API routes
├── middleware/      # Error handling
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## 🔒 Security Note

This is a prototype for hackathons. No JWT or password hashing implemented. Not production-ready.

## 📄 License

ISC
