const chatSocketHandler = require("./chatSocketHandler");
const {
    connectionGameSocketHandler,
    disconnectionGameSocketHandler,
    moveGameSocketHandler,
} = require("./gameSocketHandler");

function registerSockets(io) {
    io.on("connection", (socket) => {
        setTimeout(() => connectionGameSocketHandler(io, socket), 1000);
        chatSocketHandler(io, socket);
        moveGameSocketHandler(io, socket);

        socket.on("disconnect", () => {
            disconnectionGameSocketHandler(io, socket);
        });
    });
}

module.exports = registerSockets;
