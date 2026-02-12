const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Mongodb Info
const DB_NAME = "db_comp3133_LabTest"
const DB_USER_NAME = 'uzma_db_user'
const DB_PASSWORD = 'h2UiwgTbXxAJJbpk'
const CLUSTER_ID = 'w2wmqnu'
const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`



// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve the "views" folder as static to access /views/signup.html, /views/login.html
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// VIEWS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


//SignUp Info
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// MONGODB CONNECTION
const connectDB = async () => {
    try {
        console.log('Attempting to connect to DB');
        const DB_CONNECTION =
            `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}` +
            `@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}` +
            `?retryWrites=true&w=majority&appName=Cluster0`;

        await mongoose.connect(DB_CONNECTION);
        console.log('MongoDB connected');
    } catch (err) {
        console.log(`Error while connecting to MongoDB : ${err.message}`);
    }
};
connectDB();


// SCHEMAS
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    createdon: { type: String, required: true }
}, { collection: 'users' });

const groupMessageSchema = new mongoose.Schema({
    from_user: { type: String, required: true },
    room: { type: String, required: true },
    message: { type: String, required: true },
    date_sent: { type: String, required: true }
}, { collection: 'groupmessages' });

const privateMessageSchema = new mongoose.Schema({
    from_user: { type: String, required: true },
    to_user: { type: String, required: true },
    message: { type: String, required: true },
    date_sent: { type: String, required: true }
}, { collection: 'privatemessages' });

const User = mongoose.model('User', userSchema);
const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);
const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);

// AUTH ROUTES
app.post('/api/signup', async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;
        if (!username || !firstname || !lastname || !password) {
            return res.status(400).json({ error: 'All fields required' });
        }
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const createdon = new Date().toLocaleString('en-US');
        const user = new User({ username, firstname, lastname, password, createdon });
        await user.save();
        res.json({ message: 'Signup success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'Login success', username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// PREDEFINED ROOMS
const ROOMS = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS'];

app.get('/api/rooms', (req, res) => {
    res.json(ROOMS);
});


// Get previous messages for a room
app.get('/api/messages/:room', async (req, res) => {
    try {
        const room = req.params.room;
        const messages = await GroupMessage.find({ room }).sort({ _id: 1 }).lean();
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not load messages' });
    }
});

// Get private messages between two users
app.get('/api/private-messages/:user1/:user2', async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const messages = await PrivateMessage.find({
            $or: [
                { from_user: user1, to_user: user2 },
                { from_user: user2, to_user: user1 }
            ]
        }).sort({ _id: 1 }).lean();
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not load private messages' });
    }
});


// Track connected users by username
const connectedUsers = new Map(); // username -> socket.id

// SOCKET.IO
io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('setUsername', (username) => {
        socket.username = username;
        connectedUsers.set(username, socket.id);
        console.log(`User ${username} registered with socket ${socket.id}`);
    });

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        socket.currentRoom = room;
        socket.username = username;
        connectedUsers.set(username, socket.id);
        console.log(`${username} joined ${room}`);
        socket.to(room).emit('systemMessage', `${username} joined ${room}`);
    });

    socket.on('leaveRoom', () => {
        const room = socket.currentRoom;
        if (room) {
            socket.leave(room);
            socket.to(room).emit('systemMessage', `${socket.username} left ${room}`);
            socket.currentRoom = null;
        }
    });

    socket.on('chatMessage', async ({ room, message, username }) => {
        const from_user = username || socket.username;
        console.log('chatMessage received on server:', room, message, 'from user:', from_user);
        if (!room || !message) {
            console.log('Missing room or message');
            return;
        }
        if (!from_user) {
            console.log('ERROR: username is not set!');
            return;
        }
        const date_sent = new Date().toLocaleString('en-US');
        const msgDoc = new GroupMessage({
            from_user: from_user,
            room,
            message,
            date_sent
        });
        try {
            await msgDoc.save();
            console.log('Message saved to DB:', msgDoc);
            io.to(room).emit('chatMessage', {
                from_user: from_user,
                room,
                message,
                date_sent
            });
        } catch (err) {
            console.error('Error saving message:', err);
        }
    });

    socket.on('typing', ({ room, isTyping }) => {
        if (!room) return;
        socket.to(room).emit('typing', {
            username: socket.username,
            isTyping
        });
    });

    socket.on('privateMessage', async ({ to_user, message }) => {
        const date_sent = new Date().toLocaleString('en-US');

        // Save in MongoDB
        const msgDoc = new PrivateMessage({
            from_user: socket.username,
            to_user,
            message,
            date_sent
        });
        await msgDoc.save();

        const msgData = {
            from_user: socket.username,
            to_user,
            message,
            date_sent
        };

        // Send to sender
        socket.emit('privateMessage', msgData);

        // Send to recipient if they're online
        const recipientSocketId = connectedUsers.get(to_user);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('privateMessage', msgData);
        }
    });


    socket.on('disconnect', () => {
        if (socket.username) {
            connectedUsers.delete(socket.username);
            console.log(`User ${socket.username} disconnected`);
        }
        console.log('Socket disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
