# COMP3133 Lab Test 1 - Real-Time Chat Application

**Student:** Uzma (101504303)  
**Repository:** https://github.com/uzmashxxxikh/101504303_lab_test1_chat_app

## Overview

Real-time chat application with user authentication, multiple chat rooms, typing indicators, and private messaging.

## Tech Stack

Node.js, Express, Socket.io, MongoDB, jQuery, Bootstrap

## Features

- User signup/login with MongoDB authentication
- Real-time group messaging in 5 rooms: devops, cloud computing, covid19, sports, nodeJS
- Room isolation (messages stay within rooms)
- Typing indicators
- Private messaging
- Message persistence
- Dark mode
- Responsive design

## Setup

```bash
npm install
npm start
```

Navigate to `http://localhost:3000`

## Database Schemas

**User:** username (unique), firstname, lastname, password, createdon  
**GroupMessage:** from_user, room, message, date_sent  
**PrivateMessage:** from_user, to_user, message, date_sent
