# JWT Authentication with Node.js, Express & MongoDB

A secure JWT (JSON Web Token) authentication system built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

This project demonstrates a complete authentication flow using **Access Tokens** and **Refresh Tokens**, including user registration, login, token refresh, protected routes, and logout.

---

## Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Access Token Authentication
* JWT Refresh Token Authentication
* Protected Routes Middleware
* Secure Password Storage
* MongoDB Integration
* Environment Variable Configuration
* RESTful API Structure
* Error Handling

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcrypt
* dotenv
* CORS
* Cookie Parser (Optional)

---

## Authentication Flow

```text
User Register
      │
      ▼
Password is hashed using bcrypt
      │
      ▼
User Login
      │
      ▼
Verify Email & Password
      │
      ▼
Generate Access Token (Short Expiry)
      │
      ▼
Generate Refresh Token (Long Expiry)
      │
      ▼
Client stores tokens
      │
      ▼
Access Protected APIs using Access Token
      │
      ▼
Access Token Expired?
      │
     Yes
      │
      ▼
Send Refresh Token
      │
      ▼
Generate New Access Token
      │
      ▼
Continue Access
```

---

## Project Structure

```text
jwt-authentication/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move to the project

```bash
cd JWT_auth
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
SERVER_PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_EXPIRES_IN=7d
```

---

## Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## API Endpoints

### Register User

**POST**

```http
/api/auth/register
```

Request

```json
{
  "name": "Ganesh",
  "email": "ganesh@example.com",
  "password": "Password@123"
}
```

Response

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

### Login

**POST**

```http
/api/auth/login
```

Request

```json
{
  "email": "ganesh@example.com",
  "password": "Password@123"
}
```

Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Refresh Access Token

**POST**

```http
/api/auth/refreshToken
```

Request

```json
{
  "refreshToken": "<refresh_token>"
}
```

Response

```json
{
  "accessToken": "<new_access_token>"
}
```

---

### Protected Route

**GET**

```http
/api/profile
```

Header

```http
Authorization: Bearer <access_token>
```

---

### Logout

**POST**

```http
/api/auth/logout
```

Depending on your implementation, logout may:

* Remove the refresh token from the database.
* Clear the refresh token cookie.
* Invalidate the refresh token.

---

## Authentication Process

### Registration

* User submits registration details.
* Password is hashed using bcrypt.
* User is stored in MongoDB.

### Login

* Verify email exists.
* Compare password using bcrypt.
* Generate Access Token.
* Generate Refresh Token.
* Return tokens to the client.

### Authorization

* Client sends Access Token in the `Authorization` header.
* Middleware verifies the JWT.
* Request proceeds if the token is valid.

### Refresh Token

* Client sends the Refresh Token.
* Server validates it.
* A new Access Token is generated and returned.

### Logout

* Remove or invalidate the Refresh Token.
* User must log in again after logout.

---

## Security Best Practices

* Never store plain-text passwords.
* Hash passwords using bcrypt.
* Use HTTPS in production.
* Keep Access Tokens short-lived.
* Store Refresh Tokens securely.
* Protect all sensitive routes with authentication middleware.
* Keep JWT secrets in environment variables.
* Validate all incoming requests.
* Sanitize user input.
* Enable CORS only for trusted origins.

---

## Common HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource Not Found    |
| 409         | User Already Exists   |
| 500         | Internal Server Error |

---

## Future Improvements

* Email Verification
* Forgot Password
* Password Reset
* Role-Based Authorization (RBAC)
* OAuth Authentication (Google, GitHub)
* Rate Limiting
* Account Lockout
* Two-Factor Authentication (2FA)
* Unit & Integration Tests
* Docker Support

---

## Dependencies

```text
express
mongoose
jsonwebtoken
bcrypt
dotenv
cors
cookie-parser
nodemon
```

---

## License

This project is licensed under the MIT License.

---

## Author

**Thalathala Ganesh**

Full Stack Developer

* Node.js
* Express.js
* MongoDB
* JWT Authentication
