var http = require("http");
const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

// Create a new Express application
const app = express();

// Enable cors
app.use(cors);

// Initialize http server
const server = http.createServer(app);

// Initialize PeerJS server
const peerjsServer = ExpressPeerServer(server, {
  path: "/",
});

// Pass it in as a dependency to the express app
app.use("/", peerjsServer);

const PEER_PORT = process.env.PEER_PORT || 3016;

// Start app at specified port
server.listen(PEER_PORT, () => {
  console.log(`PeerJS server running on port ${PEER_PORT}`);
});

//test coolify
