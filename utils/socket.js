const WebSocket = require("ws");
const Student = require("../model/StudentModel/studentregistration.model");

// Function to initialize WebSocket server
function initWebSocket(server) {
  // Attach WebSocket server to the same HTTP server
  const wss = new WebSocket.Server({ server });

  console.log("✅ WebSocket server initialized");

  // Listen for new client connections
  wss.on("connection", (ws) => {
    console.log("🟢 New client connected");

    // Send a welcome message to the client
    ws.send("Hello! You are connected to WebSocket server.");

    // Handle incoming messages from client
    ws.on("message", (data) => {
      console.log(`📩 Message from client: ${data}`);

      // Respond back to the same client
      ws.send(`Server received: ${data}`);
    });

    // Handle client disconnection
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = { initWebSocket };
