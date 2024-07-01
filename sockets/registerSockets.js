const Socket = require("socket.io");
const chatSocketHandler = require("./chatSocketHandler");
const participantsSocketHandler = require("./participantsSocketHandler");
const {
    connectionGameSocketHandler,
    disconnectionGameSocketHandler,
    moveGameSocketHandler,
} = require("./gameSocketHandler");

/**
 * @param {Socket.Server} io
 */
function registerSockets(io) {
    io.on("connection", (socket) => {
        setTimeout(() => connectionGameSocketHandler(io, socket), 1000);
        chatSocketHandler(io, socket);
        moveGameSocketHandler(io, socket);
        participantsSocketHandler(io, socket);

        socket.on("disconnect", () => {
            disconnectionGameSocketHandler(io, socket);
        });
    });
}

module.exports = registerSockets;
