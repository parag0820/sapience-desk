# API Integration Guide

## Project Structure

```
src/
├── config/
│   └── api.js              (Central API configuration)
├── pages/
│   ├── Membership.jsx      (User registration/signup)
│   ├── Login.jsx           (User login)
│   └── ForgotPassword.jsx  (Password reset)
└── App.jsx                 (Route configuration)
```

## API Configuration

### Base URL

```
https://lawnode.rxchartsquare.com
```

### Configuration File: [src/config/api.js](src/config/api.js)

All API endpoints are centrally managed in the configuration file:

```javascript
const API_BASE_URL = "https://lawnode.rxchartsquare.com";

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/user/signup`,
    LOGIN: `${API_BASE_URL}/user/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/user/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/user/reset-password`,
  },
  // ... other endpoints
};
```

---

## 1. User Registration (Signup) Endpoint

**File:** [src/pages/Membership.jsx](src/pages/Membership.jsx)

### Endpoint Details

**Endpoint:** `/user/signup`
**URL:** `https://lawnode.rxchartsquare.com/user/signup`
**Method:** `POST`
**Content-Type:** `multipart/form-data` (for file uploads)

### Request Parameters

| Parameter  | Type   | Required | Description                         |
| ---------- | ------ | -------- | ----------------------------------- |
| fullName   | string | Yes      | User's full name                    |
| email      | string | Yes      | User's email address                |
| password   | string | Yes      | User's password (min 6 characters)  |
| phone      | string | No       | User's phone number                 |
| country    | string | No       | User's country                      |
| profilePic | file   | No       | User's profile picture (image file) |

**Note:** The `confirmPassword` field is validated on the frontend only and is NOT sent to the API.

### Request Example (cURL)

```bash
curl -X POST https://lawnode.rxchartsquare.com/user/signup \
  -F "fullName=John Doe" \
  -F "email=john@example.com" \
  -F "password=securepassword123" \
  -F "phone=+1234567890" \
  -F "country=United States" \
  -F "profilePic=@/path/to/profile.jpg"
```

### Request Example (JavaScript/Fetch)

```javascript
import { API_ENDPOINTS } from "../config/api";

const formData = new FormData();
formData.append("fullName", "John Doe");
formData.append("email", "john@example.com");
formData.append("password", "securepassword123");
formData.append("phone", "+1234567890");
formData.append("country", "United States");
formData.append("profilePic", fileInput.files[0]);

const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
  method: "POST",
  body: formData,
});

const data = await response.json();
```

### Response Format

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Registration successful",
  "userId": "507f1f77bcf86cd799439011",
  "user": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "country": "United States",
    "profilePicUrl": "https://api.example.com/uploads/profile-123.jpg"
  }
}
```

#### Error Response (400/500)

```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

## 2. User Login Endpoint

**File:** [src/pages/Login.jsx](src/pages/Login.jsx)

### Endpoint Details

**Endpoint:** `/user/login`
**URL:** `https://lawnode.rxchartsquare.com/user/login`
**Method:** `POST`
**Content-Type:** `application/json`

### Request Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| email     | string | Yes      | User's email    |
| password  | string | Yes      | User's password |

### Request Example (cURL)

```bash
curl -X POST https://lawnode.rxchartsquare.com/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepassword123"}'
```

### Request Example (JavaScript/Fetch)

```javascript
import { API_ENDPOINTS, apiCall } from "../config/api";

const response = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
  method: "POST",
  body: JSON.stringify({
    email: "john@example.com",
    password: "securepassword123",
  }),
});

// Store token and user data
localStorage.setItem("authToken", response.token);
localStorage.setItem("user", JSON.stringify(response.user));
```

### Response Format

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": "https://api.example.com/uploads/profile-123.jpg"
  }
}
```

#### Error Response (401)

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Frontend Implementation

The Login page includes:

- Email and password input fields
- Form validation
- Link to "Forgot Password" page
- Link to "Sign Up" (Membership) page
- Error/success messages
- Token storage in localStorage

---

## 3. Forgot Password Endpoint

**File:** [src/pages/ForgotPassword.jsx](src/pages/ForgotPassword.jsx)

### Endpoint Details

**Endpoint:** `/user/forgot-password`
**URL:** `https://lawnode.rxchartsquare.com/user/forgot-password`
**Method:** `POST`
**Content-Type:** `application/json`

### Request Parameters

| Parameter | Type   | Required | Description  |
| --------- | ------ | -------- | ------------ |
| email     | string | Yes      | User's email |

### Request Example

```bash
curl -X POST https://lawnode.rxchartsquare.com/user/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

### Response Format

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Reset token sent to your email"
}
```

#### Error Response (404)

```json
{
  "success": false,
  "message": "Email not found"
}
```

---

## 4. Reset Password Endpoint

**Endpoint:** `/user/reset-password`
**URL:** `https://lawnode.rxchartsquare.com/user/reset-password`
**Method:** `POST`
**Content-Type:** `application/json`

### Request Parameters

| Parameter  | Type   | Required | Description                     |
| ---------- | ------ | -------- | ------------------------------- |
| email      | string | Yes      | User's email                    |
| resetToken | string | Yes      | Token received via email        |
| password   | string | Yes      | New password (min 6 characters) |

### Request Example

```bash
curl -X POST https://lawnode.rxchartsquare.com/user/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "resetToken":"abc123def456",
    "password":"newpassword123"
  }'
```

### Response Format

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### Error Response (400)

```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

---

## Route Configuration

### Routes: [src/App.jsx](src/App.jsx)

```javascript
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="membership" element={<Membership />} />
    <Route path="login" element={<Login />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="videos" element={<Videos />} />
    <Route path="article/:slug" element={<ArticleDetail />} />
  </Route>
</Routes>
```

---

## Backend Requirements

Your backend API should:

1. **User Registration (Signup):**
   - Validate email format and uniqueness
   - Hash password securely (bcrypt recommended)
   - Handle file upload for profile picture
   - Store user data in database
   - Return userId on success

2. **User Login:**
   - Validate email and password
   - Generate JWT token
   - Return token and user data
   - Handle invalid credentials gracefully

3. **Forgot Password:**
   - Validate email exists
   - Generate reset token
   - Send token via email
   - Token should have expiration (recommended: 1 hour)

4. **Reset Password:**
   - Validate reset token
   - Check token expiration
   - Hash new password securely
   - Update user password in database
   - Invalidate old reset token

---

## Environment Variables (Optional)

For deployment, create a `.env` file:

```
VITE_API_BASE_URL=https://lawnode.rxchartsquare.com
```

Update [src/config/api.js](src/config/api.js):

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://lawnode.rxchartsquare.com";
```

---

## Security Best Practices

1. **Password Storage:**
   - Always hash passwords on the backend
   - Use bcrypt or similar libraries

2. **Token Management:**
   - Store JWT tokens securely (localStorage or httpOnly cookies)
   - Implement token refresh mechanism
   - Clear tokens on logout

3. **API Security:**
   - Use HTTPS only
   - Implement CORS properly
   - Validate all inputs on backend
   - Rate limit authentication endpoints

4. **Password Reset:**
   - Use secure random tokens
   - Add expiration to reset tokens
   - Send reset links via verified email

---

## Error Handling

All pages implement consistent error handling:

- Field-level validation errors
- API error messages
- Success notifications
- Loading states
- Automatic error clearing when user types

---

## Summary

| Feature         | Endpoint                | Method | Auth Required |
| --------------- | ----------------------- | ------ | ------------- |
| Signup          | `/user/signup`          | POST   | No            |
| Login           | `/user/login`           | POST   | No            |
| Forgot Password | `/user/forgot-password` | POST   | No            |
| Reset Password  | `/user/reset-password`  | POST   | No            |
| Get Profile     | `/user/profile`         | GET    | Yes           |
