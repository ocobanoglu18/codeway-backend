#Codeway Backend
This is the backend repository for the Codeway project. It provides configuration management, user authentication, and Firebase integration to support mobile and web applications.

#Features
Express Server: The backend is built using Express.js to handle HTTP requests.
Firebase Authentication: Secures routes using Firebase ID tokens.
Firestore Database: Stores configuration data and tracks changes.
CORS: Configured to allow requests from a frontend application.
Configuration Management: Supports adding, updating, and deleting application configuration settings through secured API endpoints.
Environment Variables: Uses environment variables for Firebase credentials and other sensitive data.


#Setup
#1. Clone the repository
`git clone https://github.com/ocobanoglu18/codeway-backend.git`
cd codeway-backend

#2. Install dependencies
npm install

#3. Environment setup
Create a .env file in the root of the project with the following variables:
PORT=5001
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="your-firebase-private-key"

#4. Firebase Configuration
Make sure you have a Firebase project set up with Firestore and Firebase Authentication enabled.

#5. Run the project
node src/index.js
The backend server will start on the port specified in your .env file (default is 5001).


#API Endpoints
Authentication Middleware
The backend uses Firebase authentication. To access the secured routes, you need to provide a valid Firebase ID token in the Authorization header:
Authorization: Bearer <ID_TOKEN>


#Routes
Method	Endpoint	Description
GET	/	Welcome message from the backend
GET	/config	Fetch the app configuration
POST	/config/add	Add a new configuration setting
POST	/config/update	Update an existing configuration setting
DELETE	/config/delete	

#Example: Fetch Configuration
Delete a configuration settingcurl -H "Authorization: Bearer <ID_TOKEN>" http://localhost:5001/config

#Project Structure
codebackend/
│
├── .env                 # Environment variables (not included in Git)
├── firebase.js          # Firebase Admin SDK initialization
├── package.json         # Dependencies and scripts
└── src/
    ├── index.js         # Main entry point for the Express server
    ├── controllers/
    │   └── configController.js  # Logic for handling configuration operations
    └── middlewares/
        └── authMiddleware.js    # Middleware for verifying Firebase ID tokens


#Technologies Used
Node.js: JavaScript runtime for server-side logic.
Express.js: Web framework for building RESTful APIs.
Firebase Admin SDK: Integration with Firebase Authentication and Firestore.
Firestore: NoSQL database to store and manage configuration data.
How to Contribute
Fork this repository.
Create a new branch for your feature or bug fix.
Make your changes and test thoroughly.
Submit a pull request with a clear description of your changes.
License
This project is licensed under the MIT License - see the LICENSE file for details.

