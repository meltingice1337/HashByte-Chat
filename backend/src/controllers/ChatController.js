const AuthenticationError = require('../errors/AuthenticationError');

const connectedUsers = [];

const ChatController = (io, db) => {

    const findUserByToken = (token) => {
        return {
            ...db.get('users')
                .find({ token })
                .value()
        };
    }

    io.use(function (socket, next) {
        const { token } = socket.handshake.query;
        const user = findUserByToken(token);

        if (user) {
            next();
        } else {
            next(new AuthenticationError().toJson());
        }
    });

    io.on('connection', function (socket) {
        const { token } = socket.handshake.query;
        const user = findUserByToken(token);
        const connectedUser = connectedUsers.find(connectedUser => connectedUser.token === token);

        if (connectedUser) {
            socket.disconnect();
        } else {
            user.socket = socket;
            connectedUsers.push(user);
        }

        socket.emit('connectedUsers', connectedUsers.map(user => user.username));

        socket.on('disconnect', function () {
            const connectedUserIndex = connectedUsers.findIndex(connectedUser => connectedUser.socket.id == socket.id);
            connectedUsers.splice(connectedUserIndex, 1);
        })

        socket.on('message', function (m) {
            connectedUsers.forEach((connectedUser) => {
                connectedUser.socket.emit('message', { username: user.username, message: m });
            })
        })
    });
}

module.exports = ChatController;