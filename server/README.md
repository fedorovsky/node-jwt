# API Documentation

## Authentication Routes

### Register a New User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Creates a new user account.
- **Request Body**:
  - `email` (string, required) - User's email.
  - `password` (string, required) - User's password.
- **Response**: Confirms registration and returns a JWT token.

---

### User Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user and provides a JWT token.
- **Request Body**:
  - `email` (string, required) - User's email.
  - `password` (string, required) - User's password.
- **Response**: Confirms login and returns a JWT token.

---

### Check Email Availability
- **URL**: `/auth/check-email`
- **Method**: `POST`
- **Description**: Verifies if an email is already registered.
- **Request Body**:
  - `email` (string, required) - Email to check.
- **Response**:
  - **Exists**:
    ```json
    { "exists": true, "message": "Email is already registered" }
    ```
  - **Doesn't Exist**:
    ```json
    { "exists": false, "message": "Email is available" }
    ```

---

### Validate and Renew Token
- **URL**: `/auth/validate-token`
- **Method**: `POST`
- **Description**: Validates and renews a JWT token.
- **Headers**:
  - `Authorization` (string, required) - `Bearer <token>`.
- **Responses**:
  - **Success** (200):
    ```json
    { "message": "Token is valid and has been renewed.", "token": "<newToken>" }
    ```
  - **Failure** (401):
    - Token Missing/Invalid:
      ```json
      { "error": "Unauthorized", "message": "Authentication token is missing or invalid." }
      ```
    - Token Expired:
      ```json
      { "error": "Token Expired", "message": "The authentication token has expired. Please log in again." }
      ```
    - User Not Found:
      ```json
      { "error": "Unauthorized", "message": "Authentication failed. User not found." }
      ```
    - Invalid Token:
      ```json
      { "error": "Unauthorized", "message": "Authentication token is invalid." }
      ```

---

## Protected Routes

### Protected Data Access
- **URL**: `/protected`
- **Method**: `GET`
- **Description**: Access protected content.
- **Headers**:
  - `Authorization` (string, required) - `Bearer <token>`.
- **Response**: Returns a message and list of registered users (excluding passwords).

---

## Users

### Get All Users
- **URL**: `/users`
- **Method**: `GET`
- **Description**: Retrieves all registered users.

---

### Remove All Users
- **URL**: `/users/remove-all`
- **Method**: `DELETE`
- **Description**: Deletes all users from the system.

---

## Postman Collection
- **File**: `tools/postman.json`
- **Import Steps**:
  1. Open Postman.
  2. Click **Import** > **Upload Files**.
  3. Select `tools/postman.json`.

---

## Docker

### Build Image
```bash
docker build -t node-jwt-server-image -f docker/Dockerfile .
```

### Run Container
```bash
docker run -d -p 3000:3000 --name node-jwt-server-container node-jwt-server-image
```

## Migration

### make
```bash
npx knex --knexfile ./knexfile.cjs migrate:make create_users_table
```

### run
```bash
npx knex --knexfile ./knexfile.cjs migrate:latest
```