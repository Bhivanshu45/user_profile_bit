# User Profile API

A backend API for managing user profiles and parental contacts, built for rapid prototyping and hackathons.

## 🚀 Features

- User signup and login (basic authentication)
- User profile management
- Parental contacts storage
- MongoDB Atlas integration
- Ready for deployment

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

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/user/:userId` | Get user details |
| POST | `/api/contacts/add` | Add parental contacts |
| GET | `/api/contacts/:userId` | Get parental contacts |
| GET | `/health` | Health check |

## 📝 Example Requests

### Signup
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "age": 25,
  "mobileNumber": "9876543210",
  "phoneNumber": "9876543210",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "mobileNumber": "9876543210",
  "password": "password123"
}
```

### Add Parental Contacts
```json
POST /api/contacts/add
{
  "userId": "user_id_here",
  "contactNumbers": ["9123456789", "9987654321"]
}
```

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

## 🔒 Note

This is a prototype for hackathons. No JWT or password hashing implemented. Not production-ready.

## 📄 License

ISC
