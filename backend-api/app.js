
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const dataSourse = require('./dataSourse');
const router = require('./router/route');

const app = express();
const PORT = process.env.PORT || 8080;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use('*', (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use('/api', router);

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Example of emitting an event
    socket.on('task:update', (task) => {
        socket.broadcast.emit('task:update', task);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Connect to the database and start the server
dataSourse.connect()
    .then(() => {
        console.log('Database connected!!');
        server.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error connecting to database: ${err.message}`);
    });

module.exports = { server, io };
