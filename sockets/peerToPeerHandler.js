const Socket = require("socket.io");

/**
 *
 * @param {Socket.Server} io
 * @param {Socket.Socket} socket
 */
function joinVideoHandler(io, socket) {
    socket.on("userJoinVideo", (data) => {
        const { userIdCaller, userIdReceiver } = data;

        console.log(userIdCaller + "wants to call" + userIdReceiver);

        const userSockets = io.sockets.sockets;

        for (let [socketId, _socket] of userSockets) {
            if (_socket.handshake.query.userId === userIdReceiver) {
                io.to(socketId).emit("newUserJoin", { userId: userIdCaller });
                return;
            }
        }
    });
}

module.exports = { joinVideoHandler };
