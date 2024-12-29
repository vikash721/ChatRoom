```markdown
# ChatRoom

ChatRoom is a web-based application that enables users to engage in real-time, anonymous conversations with others. This project was developed during the 3rd semester of my B.Tech in Computer Science and Engineering and is deployed at [chatroom-80f1e.web.app](https://chatroom-80f1e.web.app/).

## Features

- **Anonymous Chatting**: Connect with random users without the need for registration or personal information.
- **Real-Time Communication**: Experience instant messaging with live updates.
- **User-Friendly Interface**: Navigate the chatroom with ease, thanks to an intuitive design.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Real-Time Communication**: Socket.IO
- **Database**: Firebase Firestore
- **Deployment**: Firebase Hosting

## How It Works

1. **User Connection**: Upon accessing the application, users are assigned a unique identifier.
2. **Pairing**: The system pairs users randomly for one-on-one chat sessions.
3. **Messaging**: Users can exchange messages in real-time.
4. **Session Termination**: Either user can end the chat session, after which they can start a new session with a different user.

## Setup and Installation

To run ChatRoom locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/vikash721/ChatRoom.git
   cd ChatRoom
   ```

2. **Install dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Configure Firebase**:

   - Set up a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Replace the Firebase configuration in the project with your own credentials.

4. **Start the application**:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Deployment

ChatRoom is deployed using Firebase Hosting. To deploy your own version:

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Install Firebase CLI**:

   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**:

   ```bash
   firebase login
   ```

4. **Initialize Firebase in your project**:

   ```bash
   firebase init
   ```

   - Select Hosting and Firestore as the services to set up.
   - Use the build directory as the public directory.

5. **Deploy to Firebase**:

   ```bash
   firebase deploy
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Experience ChatRoom live at [chatroom-80f1e.web.app](https://chatroom-80f1e.web.app/) and connect with people around the world.
``` 
