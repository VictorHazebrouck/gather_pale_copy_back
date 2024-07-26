const Socket = require("socket.io");

/**
 *
 * @param {Socket.Server} io
 * @param {Socket.Socket} socket
 */
function joinVideoHandler(io, socket) {
    socket.on("userJoinVideo", (data) => {
        const { userIdCaller, userIdReceiver } = data;

        const userSockets = io.sockets.sockets;

        for (let [socketId, _socket] of userSockets) {
            if (_socket.handshake.query.userId === userIdReceiver) {
                io.to(socketId).emit("newUserJoin", { userId: userIdCaller });
                return;
            }
        }
    });
}

/**
 *
 * @param {Socket.Server} io
 * @param {Socket.Socket} socket
 */
function userStreamControlsHandler(io, socket) {
    socket.on("initiate_video_mute_change", (data) => {
        const { userId } = socket.handshake.query;
        io.emit("receive_video_mute_change", { userId, state: data });
    });
    socket.on("initiate_audio_mute_change", (data) => {
        const { userId } = socket.handshake.query;
        io.emit("receive_audio_mute_change", { userId, state: data });
    });
}

module.exports = { joinVideoHandler, userStreamControlsHandler };
