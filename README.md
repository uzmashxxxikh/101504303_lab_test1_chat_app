COMP3133 – Lab Test 1 – Real‑Time Chat App
------------------------------------------

Student: Uzma Shaikh  
Student ID: 101504303  


1. Packages / Project Setup
---------------------------

Installation and setup:

1) Initialize the project  
   npm init -y

2) Install production dependencies  
   npm install express mongoose socket.io cors

3) Install development dependencies  
   npm install --save-dev nodemon

The project uses:
- Express, Socket.io, Mongoose, cors
- MongoDB Atlas cluster: db_comp3133_LabTest
- Frontend: HTML5, CSS, Bootstrap 5, jQuery, fetch API


2. Signup Screen
----------------

- New users can create an account with a unique username.
- On successful signup, user data is stored in MongoDB and the app redirects to the login page.
- Attempting to reuse an existing username shows an error message.

Screenshot (signup success):  
https://github.com/user-attachments/assets/68f4dbc5-a84f-42cc-9483-755fb7220d25


3. Login Screen
----------------

- Existing users can log in with username and password.
- On successful login, "chatUser" is stored in localStorage to maintain the session.
- Logout clears localStorage and redirects back to the login page.

Screenshot (login page):  
https://github.com/user-attachments/assets/98e629f4-19f2-4362-8db0-c19168f2c032


4. Rooms and Group Chat
-----------------------

- Predefined rooms: devops, cloud computing, covid19, sports, nodeJS.
- Users can Join a room to start chatting and Leave to stop receiving messages.
- When switching rooms, the chat window clears and then reloads only that room’s previous messages from MongoDB.
- Real‑time messages are handled by Socket.io.
- Messages are stored as group messages in MongoDB (collection: groupmessages).

Screenshots:  
Rooms view:  
https://github.com/user-attachments/assets/357ac631-f289-4740-aeed-753575f6a791  

Chat view (dark style):  
https://github.com/user-attachments/assets/afc7bad5-3c65-4c9c-92c9-826ecb358459


5. Private Messages
-------------------

- Users can send a private message by entering the target username in the "Private message" field and clicking the PM button.
- Private messages are saved in the privatemessages collection with: from_user, to_user, message, date_sent.
- Only the sender sees their own private message bubble in the UI, while the database records both users.

Screenshot (private message UI):  
https://github.com/user-attachments/assets/2d9a9664-78f0-441d-a241-e99b024edc7b


6. MongoDB Collections
----------------------

Database: db_comp3133_LabTest

Collections:

1) users  
   - Fields: username, firstname, lastname, password, createdon.  
   - username has a unique index to prevent duplicates.

2) groupmessages  
   - Fields: from_user, room, message, date_sent.  
   - Stores all room‑based chat messages.

3) privatemessages  
   - Fields: from_user, to_user, message, date_sent.  
   - Stores 1‑to‑1 private messages between users.

Screenshots:  
Cluster view:  
https://github.com/user-attachments/assets/c1e80718-6d6d-4268-88b0-727895d176a4  

Group messages collection:  
https://github.com/user-attachments/assets/f338720f-47aa-42d5-ba75-864f842ced1a  

Private messages collection:  
https://github.com/user-attachments/assets/208fb085-20e2-4899-81d0-95aa455e9f56


7. How to Run
-------------

1) Clone the repository:

   git clone https://github.com/uzmashxxxikh/101504303_lab_test1_chat_app.git  
   cd 101504303_lab_test1_chat_app

2) Install dependencies:

   npm install

3) Start the development server:

   npm run dev

4) Open in the browser:

   Signup page:  
   http://localhost:3000/views/signup.html  

   Login page:  
   http://localhost:3000/views/login.html  

Ensure the MongoDB Atlas connection string in server.js points to the db_comp3133_LabTest database before running the application.
