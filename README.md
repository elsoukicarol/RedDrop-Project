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

  ## API Endpoints

 # User API

## Overview
This API manages user operations in a NestJS application using Express. It provides functionalities to handle user creation, activation, login, retrieval, and updates.

## API Endpoints

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

## Models
- **User**: Represents the user entity.
- **CreateUserDto**: Data transfer object for creating a user.
- **UpdateUserDto**: Data transfer object for updating user information.

## Security
Endpoints may require authentication using JWT as specified in the API documentation above.

## Error Handling
Errors are handled through standard HTTP status codes along with JSON responses specifying the issue.

