## DatingApp

The primary goal of this dating app is to go beyond traditional dating norms, 
giving users a personalized experience that fits their individual preferences.
This web application offers users customized preferences features, a simple 
sign-up form, and a seamless online chatting platform.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)

## Technologies Used

1 - Backend Technologies 

    * `Node JS`
    * `Nest JS`
    * `Postgress`
    * `JWT`
    * `Bcrypt`

2 - Frontend Technologies 

    * `React`


## Getting Started

To get started with the project follow these steps:

## Prerequisites

  1 - npm (Node Package Manager)

    npm install node


## Installation

  1 - Clone repository

    git clone https://github.com/elsoukicarol/RedDrop

  2 - Install libraries/packages

    npm install

  ## Configuration

  Create a .env file and set the basic configuration. This configuration 
  should match your database name, port number, json secret key, username, and password. 

# API Endpoints

## User API

### POST /user/signup
- **Description**: Registers a new user.
- **Request Body**: `CreateUserDto` object.
- **Responses**:
  - `200 OK` on successful creation.
  - `300 Multiple Choices` if user already exists.
  - `400 Bad Request` on failure.

### POST /user/activate
- **Description**: Activates a user account using an OTP.
- **Request Body**: JSON with `id` (user ID) and `otp`.
- **Responses**:
  - `200 OK` on successful activation.
  - `400 Bad Request` if OTP or user ID is invalid.

### POST /user/login
- **Description**: Authenticates a user.
- **Request Body**: JSON with `email` and `password`.
- **Responses**:
  - `200 OK` on successful login.
  - `401 Unauthorized` if credentials are incorrect.
  - `400 Bad Request` on other errors.

### GET /user/donors
- **Description**: Retrieves a list of donors.
- **Security**: Protected by JWT.
- **Responses**:
  - `200 OK` with an array of `Partial<User>` objects.

### PUT /user/:id
- **Description**: Updates user information.
- **Parameters**:
  - `id`: User ID.
- **Request Body**: `UpdateUserDto` object.
- **Security**: Protected by JWT.
- **Responses**:
  - `200 OK` on successful update.
  - `400 Bad Request` on failure or if user ID does not match.

### POST /user
- **Description**: Alias for user creation (identical to POST /user/signup).

### GET /user
- **Description**: Fetches all users.
- **Responses**:
  - `200 OK` with user data.

### GET /user/:id
- **Description**: Retrieves specific user by ID.
- **Parameters**:
  - `id`: User ID.
- **Responses**:
  - `200 OK` with user data.

### DELETE /user/:id
- **Description**: Deletes a user.
- **Parameters**:
  - `id`: User ID.
- **Responses**:
  - `200 OK` on successful deletion.

## Data Transfer Objects
- **CreateUserDto**: Data transfer object for creating a user.
- **UpdateUserDto**: Data transfer object for updating user information.

## Charities API

### POST /charities/create
- **Description**: Creates a new charity record.
- **Request Body**: `CreateCharityDto` object.
- **Responses**:
  - Returns the created charity entity on success.
  - Returns an error message on failure.

### DELETE /charities/:id
- **Description**: Deletes a charity by its ID.
- **Parameters**:
  - `id`: Charity ID.
- **Security**: Optional JWT authentication.
- **Responses**:
  - Returns a confirmation message on success.
  - Returns an error message on failure.

### PATCH /charities/:id
- **Description**: Updates a charity by its ID.
- **Parameters**:
  - `id`: Charity ID.
- **Request Body**: `UpdateCharityDto` object.
- **Security**: Optional JWT authentication.
- **Responses**:
  - Returns the updated charity entity on success.
  - Errors are handled implicitly by NestJS.

### GET /charities/charity/:id
- **Description**: Retrieves a specific charity by ID.
- **Parameters**:
  - `id`: Charity ID.
- **Security**: Optional JWT authentication.
- **Responses**:
  - Returns the charity entity on success.
  - Returns `null` if no charity is found.

### GET /charities/getall
- **Description**: Retrieves all charities.
- **Security**: Optional JWT authentication.
- **Responses**:
  - Returns an array of all charity entities.

### GET /charities
- **Description**: Alias to retrieve all charities (identical to GET /charities/getall).

### GET /charities/:id
- **Description**: Retrieves a specific charity by ID.
- **Parameters**:
  - `id`: Charity ID.
- **Responses**:
  - Returns the charity entity on success.
  - Returns `null` if no charity is found.

### PATCH /charities/:id
- **Description**: Updates a specific charity by ID.
- **Parameters**:
  - `id`: Charity ID.
- **Request Body**: `UpdateCharityDto` object.
- **Responses**:
  - Returns the updated charity entity on success.

### DELETE /charities/:id
- **Description**: Deletes a specific charity by ID.
- **Parameters**:
  - `id`: Charity ID.
- **Responses**:
  - Returns a confirmation message on success.

## Data Transfer Objects
- **CreateCharityDto**: Data transfer object for creating a charity.
- **UpdateCharityDto**: Data transfer object for updating charity information.

## Financial Transactions API

### POST /financial-transactions/create
- **Description**: Creates a new financial transaction.
- **Request Body**:
  - `amount`: Transaction amount (number).
  - `currency`: Transaction currency (string).
  - `user_id`: User ID associated with the transaction (number).
  - `charity_id`: Charity ID associated with the transaction (number).
- **Security**: Protected by JWT.
- **Responses**:
  - Returns the created transaction entity on success.
  - Returns an error message on failure.

### GET /financial-transactions/user-transactions
- **Description**: Retrieves all transactions associated with the logged-in user.
- **Security**: Protected by JWT.
- **Responses**:
  - Returns an array of `FinancialTransaction` entities on success.
  - Returns an error message on failure.

### GET /financial-transactions
- **Description**: Fetches all financial transactions.
- **Responses**:
  - Returns an array of all transaction entities.

### GET /financial-transactions/:id
- **Description**: Retrieves a specific financial transaction by ID.
- **Parameters**:
  - `id`: Transaction ID.
- **Responses**:
  - Returns the transaction entity on success.
  - Returns `null` if no transaction is found.

### PATCH /financial-transactions/:id
- **Description**: Updates a specific financial transaction.
- **Parameters**:
  - `id`: Transaction ID.
- **Request Body**: `UpdateFinancialTransactionDto` object.
- **Responses**:
  - Returns the updated transaction entity on success.
  - Errors are handled implicitly by NestJS.

### DELETE /financial-transactions/:id
- **Description**: Deletes a specific financial transaction.
- **Parameters**:
  - `id`: Transaction ID.
- **Responses**:
  - Returns a confirmation message on successful deletion.

## Data Transfer Objects
- **CreateFinancialTransactionDto**: Data transfer object for creating a transaction.
- **UpdateFinancialTransactionDto**: Data transfer object for updating a transaction.

## Post API

### POST /post/create
- **Description**: Creates a new blog post.
- **Request Body**: `CreatePostDto` object.
- **Security**: JWT authentication required.
- **Responses**:
  - Returns the created post entity on success.
  - Returns an error message on failure.

### DELETE /post/:postId
- **Description**: Deletes a blog post by its ID.
- **Parameters**:
  - `postId`: Post ID.
- **Security**: JWT authentication required.
- **Responses**:
  - `{"message": "Post was deleted successfully"}` on success.
  - `{"message": "Post was not found"}` if the post does not exist.

### GET /post/userposts
- **Description**: Retrieves all posts created by the logged-in user.
- **Security**: JWT authentication required.
- **Responses**:
  - Returns an array of post entities on success.
  - Returns an error message on failure.

### GET /post/getAllPosts
- **Description**: Fetches all posts in the system.
- **Security**: JWT authentication required.
- **Responses**:
  - Returns an array of all post entities.

### PATCH /post/:postId
- **Description**: Updates a specific blog post by its ID.
- **Parameters**:
  - `postId`: Post ID.
- **Request Body**: `UpdatePostDto` object.
- **Security**: JWT authentication required.
- **Responses**:
  - Returns the updated post entity on success.
  - Errors are handled implicitly by NestJS.

### GET /post
- **Description**: Fetches all posts.
- **Responses**:
  - Returns an array of all post entities.

### GET /post/:id
- **Description**: Retrieves a specific post by ID.
- **Parameters**:
  - `id`: Post ID.
- **Responses**:
  - Returns the post entity on success.
  - Returns `null` if no post is found.

### PATCH /post/:id
- **Description**: Updates a specific post by ID.
- **Parameters**:
  - `id`: Post ID.
- **Request Body**: `UpdatePostDto` object.
- **Responses**:
  - Returns the updated post entity on success.

### DELETE /post/:id
- **Description**: Deletes a specific post by ID.
- **Parameters**:
  - `id`: Post ID.
- **Responses**:
  - `{"message": "Post was removed successfully"}` on successful deletion.

## Data Transfer Object
- **CreatePostDto**: Data transfer object for creating a post.
- **UpdatePostDto**: Data transfer object for updating a post.

## Models
- **User**: Represents the user entity.
- **Charity**: Represents the charity entity.
- **FinancialTransaction**: Represents the financial transaction entity.
- **Post**: Represents the blog post entity.

## Security
Endpoints may require authentication using JWT as specified in the API documentation above.

## Error Handling
Errors are handled through standard HTTP status codes along with JSON responses specifying the issue.