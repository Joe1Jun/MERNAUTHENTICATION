# MERN Authentication App

This project is a MERN stack application that implements user authentication using JWT tokens. Users can sign up and log in, and upon successful authentication, they are redirected to a home page. The application features a basic user interface built with React and Express.js.

## Description

The **MERN Authentication App** provides a simple yet effective way to manage user authentication in a web application. Leveraging the power of MongoDB, Express.js, React, and Node.js, this app allows users to create an account, log in securely, and access protected routes.

## Features

- **User Registration**: Users can sign up with their credentials.
- **User Login**: Users can log in using their registered credentials.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Redirect on Login**: Users are redirected to a home page upon successful login.
- **Basic UI**: A straightforward user interface for ease of use.

## Project Structure

- **Frontend**: Located in the `frontend/mern-auth` directory, this React application handles user interaction.
- **Backend**: The Express.js application is located in the `server` directory, handling authentication and data storage.

## Setup

1. **Clone the Repository:**
   - Open your terminal and run:
     ```bash
     git clone https://github.com/Joe1Jun/MERNAUTHENTICATION.git
     ```

2. **Navigate to the Project Directory:**
   - Change to the project directory:
     ```bash
     cd MERNAUTHENTICATION
     ```

3. **Setup the Backend:**
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file for environment variables and add the necessary configurations, such as database connection strings and JWT secret.

4. **Run the Backend:**
   - Start the Express server:
     ```bash
     npm start
     ```

5. **Setup the Frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd /frontend/mern-auth
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Start the Vite development server:
     ```bash
     npm run dev
     ```

6. **Access the Application:**
   - Open your browser and go to `http://localhost:5173` to interact with the application.

## Usage

- **Sign Up**: Create a new account by entering your details on the sign-up page.
- **Log In**: Use your credentials to log in and access the home page.
- **Protected Routes**: Only authenticated users can access certain parts of the application.

## Dependencies

- **Frontend**: React, Axios, Vite
- **Backend**: Express.js, Mongoose, bcryptjs, jsonwebtoken

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features.
