const Socket = require("socket.io");

/** @type {PlayerData[]}*/
let Players = [];

/**
 *
 * @param {Socket.Server} io
 * @param {Socket.Socket} socket
 */
function moveGameSocketHandler(io, socket) {
    socket.on("move", (data) => {
        /**@type {MoveInstructions}*/
        const { x, y, direction, userId } = data;

        const index = Players.findIndex((e) => e.userId === userId);
        if (index === -1) {
            return;
        }
        Players[index] = { ...Players[index], x, y };
        io.emit("newPlayerMove", { userId, x, y, direction });
    });
}

/**
 *
 * @param {Socket.Server} io
 * @param {Socket.Socket} socket
 */
function connectionGameSocketHandler(io, socket) {
    /** @type {HandshakeData} */
    const { userName, userId, lastPositionX, lastPositionY } = socket.handshake.query;

    if (Players.some((e) => e.userId === userId)) {
        return;
    }
    /** @type {PlayerData} */
    const player = {
        userId,
        userName,
        x: Number(lastPositionX),
        y: Number(lastPositionY),
    };

    Players.push(player);

    io.to(socket.id).emit("connectionData", { Players });
    io.emit("newPlayerConnected", player);
}

/**
 *
 * @param {Socket.Server} io
 * @param {Socket.Socket} socket
 */
function disconnectionGameSocketHandler(io, socket) {
    /** @type {HandshakeData} */
    const { userId } = socket.handshake.query;

    Players = Players.filter((e) => e.userId !== userId);
    io.emit("playerDisconnected", { userId: userId });
}

module.exports = {
    connectionGameSocketHandler,
    disconnectionGameSocketHandler,
    moveGameSocketHandler,
};

/**
 * Represents move instructions data
 *
 * @typedef {object} MoveInstructions
 * @property {string} userId - id from the movement initiator
 * @property {string} direction - direction in which the player wishes to move
 * @property {number} x - x coordinaates at the moment of emission
 * @property {number} y - y coordinaates at the moment of emission
 */

/**
 * Represent initial connection
 *
 * @typedef {object} HandshakeData
 * @property {string} userId - id from the player
 * @property {string} userName - name of the player
 * @property {number} lastPositionX - x coordinaates at the moment of connection
 * @property {number} lastPositionY - y coordinaates at the moment of connection
 */

/**
 * Represents unique player data shared with each Player
 *
 * @typedef {object} PlayerData
 * @property {string} userId - The unique ID of the player
 * @property {string} userName - The username of the player
 * @property {number} x - The x-coordinae fo the player
 * @property {number} y - The y-coordinae fo the player
 */
