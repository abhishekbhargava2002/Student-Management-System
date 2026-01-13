const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  console.log("Client Connected");
  ws.send("Hi server is working....");

  ws.on("message", (msg) => {
    console.log(message);
    ws.send("Hello server ");
  });
});
console.log("Working");
