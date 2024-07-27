const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    // Real-time updates logic
});

server.listen(PORT, () => console.log(`Socket server running on port ${PORT}`));

module.exports = {
    server, io
}