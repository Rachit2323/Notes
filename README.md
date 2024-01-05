**Project README**

This README provides an overview of the functionalities and usage of a note-taking application with user authentication. The project is structured using Node.js and MongoDB for the backend, with authentication handled through JWT (JSON Web Tokens). Below is a breakdown of the key components and features:

### 1. User Authentication

#### 1.1 Signup

- **Endpoint:** `/signup` (POST)
- **Description:** Allows users to create an account by providing a name, email, password, and confirming the password.
- **Validation:**
  - Password cannot be empty.
  - Password and confirm password must match.
  - Email must be in a valid format.
  - Checks for existing users with the same email.

#### 1.2 Login

- **Endpoint:** `/login` (POST)
- **Description:** Enables users to log in by providing their email and password.
- **Validation:**
  - Checks if the email exists.
  - Verifies the password.

#### 1.3 Authentication Middleware

- **Middleware:** `isAuthenticated`
- **Description:** Ensures that routes requiring authentication are accessed only with a valid JWT. Extracts user ID from the token and sets it in the request object.

### 2. Note Management

#### 2.1 Create Note

- **Endpoint:** `/createNote` (POST)
- **Description:** Allows authenticated users to create a new note by providing a title and content.
- **Validation:**
  - Title and content are required fields.

#### 2.2 Get User Notes

- **Endpoint:** `/getUserNotes` (GET)
- **Description:** Retrieves all notes associated with the authenticated user.

#### 2.3 Get User Note by ID

- **Endpoint:** `/getUserNoteById/:id` (GET)
- **Description:** Retrieves a specific note by its ID for the authenticated user.

#### 2.4 Update User Note by ID

- **Endpoint:** `/updateUserNoteById/:id` (PUT)
- **Description:** Updates the title and content of a specific note by its ID for the authenticated user.
- **Validation:**
  - Both title and content are required for the update.

#### 2.5 Delete User Note by ID

- **Endpoint:** `/deleteUserNoteById/:id` (DELETE)
- **Description:** Deletes a specific note by its ID for the authenticated user.

#### 2.6 Search Notes

- **Endpoint:** `/searchNotes` (GET)
- **Description:** Searches for notes based on a query parameter (`que`) provided in the request.
- **Validation:**
  - Search query parameter 'q' is required.

#### 2.7 Share Note

- **Endpoint:** `/shareNote/:id` (POST)
- **Description:** Shares a specific note with another user by providing their email.
- **Validation:**
  - Email address is required to share the note.
  - Checks if the note is already shared with the user.

### 3. Technologies Used

- **Backend Framework:** Node.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt

### 4. Setup Instructions

1. Install Node.js and MongoDB.
2. Clone the repository.
3. Run `npm install` to install dependencies.
4. MongoDB connection details.
5. Run the application using `npm start`.

### 5. Error Handling

- Proper error messages and status codes are provided for different scenarios, such as validation failures, authentication issues, and database errors.


