# COMP3133 – Lab Test 1 – Real‑Time Chat App

Student: Uzma Shaikh  
Student ID: 101504303  

---

## 1. Packages / Project Setup

The project uses:

- Express, Socket.io, Mongoose, cors
- MongoDB Atlas cluster `db_comp3133_LabTest`
- Frontend: HTML5, CSS, Bootstrap 5, jQuery, fetch API

Screenshot: `packages.png` (project root in terminal and installed node packages).

---

## 2. Signup Screen

- New users can create an account with unique username.
- On successful signup, user data is stored in MongoDB and the app redirects to the login page.
- Attempting to reuse an existing username shows an error.

Screenshots:

- `signup-success.png` – successful signup.  

---

## 3. Login Screen

- Existing users can log in with username and password.
- On successful login, `chatUser` is stored in `localStorage` to maintain the session.
- Logout clears `localStorage` and redirects back to login.

Screenshots:

- `login-page.png` – login UI.  

---

## 4. Rooms and Group Chat

- Predefined rooms: `devops`, `cloud computing`, `covid19`, `sports`, `nodeJS`.
- Users can **Join** a room to start chatting and **Leave** to stop receiving messages.
- When switching rooms, the chat window clears and reloads only that room’s previous messages from MongoDB.
- Real‑time messages are handled by Socket.io and stored as group messages in MongoDB.

Screenshots:

- `rooms-dropdown.png` – room list.  
- `group-chat-sports.png` – multiple users chatting in `sports`.  
- `typing-indicator.png` – one user typing while another sees “username is typing…”.

---

## 5. Private Messages

- Users can send a private message by entering the target username in the “Private message” field and clicking **PM**.
- Private messages are saved in the `privatemessages` collection with `from_user`, `to_user`, `message`, and `date_sent`.
- Only the sender sees their own PM bubble in the UI, but the database records both sides for auditing.

Screenshot:

- `private-message-ui.png` – Su sends Uzma a private message.  
- `private-message-mongo.png` – MongoDB view of `privatemessages` collection.

---

## 6. MongoDB Collections

The application uses three main collections:

1. **users**  
   - Stores username, firstname, lastname, password, createdon.  
   - Unique index on `username`.

2. **groupmessages**  
   - Stores `from_user`, `room`, `message`, `date_sent` for room‑based chat.

3. **privatemessages**  
   - Stores `from_user`, `to_user`, `message`, `date_sent` for private chat.

Screenshots:

- `mongo-users.png` – `users` collection.  
- `mongo-groupmessages.png` – `groupmessages` collection.  
- `mongo-privatemessages.png` – `privatemessages` collection.

---

## 7. How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/uzmashxxxikh/101504303_lab_test1_chat_app.git
   cd 101504303_lab_test1_chat_app
