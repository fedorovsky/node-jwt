# node-jwt

## API Endpoints

### Authentication Routes

#### Register a New User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user by creating an account.
- **Request Body**:
  - `email` (string, required) - The email for the account.
  - `password` (string, required) - The password for the account.
- **Response**: Returns a message confirming registration and a JWT token if successful.

#### User Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user and returns a JWT token.
- **Request Body**:
  - `email` (string, required) - The email for the account.
  - `password` (string, required) - The password for the account.
- **Response**: Returns a message confirming login and a JWT token if credentials are valid.

#### Check Email Availability

- **URL**: `/auth/check-email`
- **Method**: `POST`
- **Description**: Checks if an email is already registered in the system.
- **Request Body**:
    - `email` (string, required) - The email to check for availability.
- **Response**:
  - **If the email is already registered:**
    ```json
    {
      "exists": true,
      "message": "Email is already registered"
    }

## Protected Routes

### Protected Data Access

- **URL**: `/protected`
- **Method**: `GET`
- **Description**: Accesses protected content. Requires a valid JWT token in the `Authorization` header.
- **Headers**:
  - `Authorization` (string, required) - Bearer token obtained from login.
- **Response**: Returns a message and a list of registered users (excluding passwords).

## Users

### Get All Users
- **URL**: `/users`
- **Method**: `GET`
- **Description**: Retrieves a list of all registered users.

### Remove All Users
- **URL**: `/users/remove-all`
- **Method**: `DELETE`
- **Description**: Deletes all registered users from the system.

## Postman

The file `tools/postman.json` contains a pre-configured Postman collection for testing this API. To import it into Postman:

1. Open Postman.
2. Click on **Import** in the top left corner.
3. Select **Upload Files** and choose `tools/postman.json`.
4. The collection will be added, allowing you to test the API endpoints easily.

## Docker

Build a Docker Image from the current directory with the name node-jwt-image

```bash
docker build -t node-jwt-server-image -f docker/Dockerfile .
```

Run the container in detached mode, map port 3000 to 3000, and name it node-jwt-container

```bash
docker run -d -p 3000:3000 --name node-jwt-server-container node-jwt-server-image
```
