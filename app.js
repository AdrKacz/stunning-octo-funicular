const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server
const server = http.createServer();
server.listen(webSocketServerPort);
console.log(`Listening on port ${webSocketServerPort}`);

const wsServer = new webSocketServer({
  httpServer: server,
});

const clients = {};

const getUniqueID = () => {
  const s4 = () => (Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
  return s4() + s4() + '-' + s4();
}
wsServer.on('request', (request) => {
  const userID = getUniqueID();
  console.log(`[\x1b[34m${Date.now()}\x1b[0m] Received a new connection from origin ${request.origin}.`);

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(`[\x1b[34m${Date.now()}\x1b[0m] Connected: ${userID} in [${Object.getOwnPropertyNames(clients)}]`);

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log(`[\x1b[34m${Date.now()}\x1b[0m] Received Message:`, JSON.parse(message.utf8Data));

      // Broadcasting message to all connected clients
      for (clientID in clients) {
        clients[clientID].sendUTF(message.utf8Data);
        console.log(`[\x1b[34m${Date.now()}\x1b[0m] Sent Message to: ${clientID}`);
      }

    }
  })
});
