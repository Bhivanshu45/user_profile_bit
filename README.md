# User Profile API

A simple backend API for storing user profiles, built for rapid prototyping and hackathons.

**🌐 Live URL:** `https://user-profile-bit.onrender.com`

## 🚀 Features

- User signup (store user data)
- User profile retrieval
- MongoDB Atlas integration
- Send SMS via Twilio
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
# Add Twilio credentials if using the SMS endpoint

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
  "fullName": "John Doe",
  "age": 25,
  "gender": "Male"
}
```
**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "699743461d29df815dff4e08",
    "fullName": "John Doe",
    "age": 25,
    "gender": "Male"
  }
}
```
**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide full name, age, and gender"
}
```

---

### **3. Get User Details**
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
    "fullName": "John Doe",
    "age": 25,
    "gender": "Male",
    "parentalContacts": ["9123456789", "9987654321"],
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

### **4. Add Parental Contacts**
```
POST https://user-profile-bit.onrender.com/api/contacts/add/{userId}
Content-Type: application/json
```
**Example:**
```
POST https://user-profile-bit.onrender.com/api/contacts/add/699743461d29df815dff4e08
```
**Request Body:**
```json
{
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

---

### **5. Get Parental Contacts**
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

---

### **6. Send SMS (Twilio)**
```
POST https://user-profile-bit.onrender.com/api/sms/send
Content-Type: application/json
```
**Request Body:**
```json
{
  "to": "+14155552671",
  "message": "Hello from Twilio!"
}
```
**Success Response (200):**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "data": {
    "sid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "to": "+14155552671",
    "status": "queued"
  }
}
```

---

## 📋 Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/auth/signup` | Register new user |
| GET | `/api/user/:userId` | Get user details |
| POST | `/api/contacts/add/:userId` | Add/Update parental contacts |
| GET | `/api/contacts/:userId` | Get parental contacts |
| POST | `/api/sms/send` | Send SMS via Twilio |

---

## 🔄 Typical API Flow

1. **Signup** → Submit fullName, age, and gender → Get `userId`
2. **Add Contacts** → Save parental contacts for `userId`
3. **Get User Details** → Fetch profile + contacts using `userId`

---

## 📲 Twilio Setup

Add the following environment variables in your `.env`:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+14155552671
# Optional: use this instead of TWILIO_FROM_NUMBER
TWILIO_MESSAGING_SERVICE_SID=MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

If you set `TWILIO_MESSAGING_SERVICE_SID`, it will be used instead of `TWILIO_FROM_NUMBER`.

---

## ⚠️ Important Notes

- **First Request Delay:** First API call may take 15-30 seconds (Render free tier wakes up from sleep)
- **Gender Options:** Must be one of: `Male`, `Female`, `Other`
- **Age Validation:** Must be between 1-120
- **Content-Type:** Always use `application/json` for POST requests
- **userId:** Save from signup response for subsequent requests

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
