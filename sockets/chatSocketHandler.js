function chatSocketHandler(io, socket) {
    socket.on("chatMessage", (data) => {
        const userSockets = io.sockets.sockets;
        console.log("user found");

        for (let [socketId, _socket] of userSockets) {
            if (_socket.handshake.query.userId === data.userIdReceiver) {
                io.to(socketId).emit("chatMessageReceived", data);
                return;
            }
        }
    });
}

module.exports = chatSocketHandler;
