const Socket = require("socket.io");

/**
 *
 * @param {Socket.Server} io
 * @param {Socket.Socket} socket
 */
function handleParticipants(io, socket) {
    socket.on("nameChanged", ({ newName }) => {
        const { userId } = socket.handshake.query;
        io.emit("aNameHasChanged", { userId, newName });
    });
}

module.exports = handleParticipants;
