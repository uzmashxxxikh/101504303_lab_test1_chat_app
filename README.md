# COMP3133 – Lab Test 1 – Real‑Time Chat App

Student: Uzma Shaikh  
Student ID: 101504303  

---

## 1. Packages / Project Setup

🛠️ Installation and Setup

1. Initialize the Project:
`npm init -y`

2. Install Production Dependencies
`npm install express mongoose socket.io cors`

4. Install Development Dependencies
`npm install --save-dev nodemon`

The project uses:

- Express, Socket.io, Mongoose, cors
- MongoDB Atlas cluster `db_comp3133_LabTest`
- Frontend: HTML5, CSS, Bootstrap 5, jQuery, fetch API

---

## 2. Signup Screen

- New users can create an account with unique username.
- On successful signup, user data is stored in MongoDB and the app redirects to the login page.
- Attempting to reuse an existing username shows an error.

<img width="1904" height="638" alt="signup-success png" src="https://github.com/user-attachments/assets/68f4dbc5-a84f-42cc-9483-755fb7220d25" />


---

## 3. Login Screen

- Existing users can log in with username and password.
- On successful login, `chatUser` is stored in `localStorage` to maintain the session.
- Logout clears `localStorage` and redirects back to login.

<img width="1904" height="534" alt="login-page png" src="https://github.com/user-attachments/assets/98e629f4-19f2-4362-8db0-c19168f2c032" />

---

## 4. Rooms and Group Chat

- Predefined rooms: `devops`, `cloud computing`, `covid19`, `sports`, `nodeJS`.
- Users can **Join** a room to start chatting and **Leave** to stop receiving messages.
- When switching rooms, the chat window clears and reloads only that room’s previous messages from MongoDB.
- Real‑time messages are handled by Socket.io and stored as group messages in MongoDB.

*Rooms*
<img width="917" height="746" alt="Screenshot 2026-02-11 193132" src="https://github.com/user-attachments/assets/357ac631-f289-4740-aeed-753575f6a791" />
*DarkMode*
<img width="958" height="788" alt="Screenshot 2026-02-11 192352" src="https://github.com/user-attachments/assets/afc7bad5-3c65-4c9c-92c9-826ecb358459" />



---

## 5. Private Messages

- Users can send a private message by entering the target username in the “Private message” field and clicking **PM**.
- Private messages are saved in the `privatemessages` collection with `from_user`, `to_user`, `message`, and `date_sent`.
- Only the sender sees their own PM bubble in the UI, but the database records both sides for auditing.

<img width="649" height="376" alt="Screenshot 2026-02-11 190355" src="https://github.com/user-attachments/assets/2d9a9664-78f0-441d-a241-e99b024edc7b" />


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

*CLUSTER: db_comp3133_LabTest*
<img width="221" height="91" alt="image" src="https://github.com/user-attachments/assets/c1e80718-6d6d-4268-88b0-727895d176a4" />
*GroupMessages:*
<img width="988" height="94" alt="image" src="https://github.com/user-attachments/assets/f338720f-47aa-42d5-ba75-864f842ced1a" />
*PrivateMessages:*
<img width="981" height="92" alt="image" src="https://github.com/user-attachments/assets/208fb085-20e2-4899-81d0-95aa455e9f56" />


---

## 7. How to Run


1. Clone the repository:

   ```bash
   git clone https://github.com/uzmashxxxikh/101504303_lab_test1_chat_app.git
   cd 101504303_lab_test1_chat_app

2. 🏃How to Run:
`npm run dev`
