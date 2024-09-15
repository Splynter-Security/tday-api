const WebSocket = require('ws');
const axios = require('axios');
const url = require('url');

// Create a WebSocket server but don't bind to a specific port yet
const wss = new WebSocket.Server({ noServer: true });

// Broadcast a message to all connected clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Listen for WebSocket connections on the /websocket path
wss.on('connection', ws => {
    console.log('Client connected via WebSocket');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Poll API for status updates every 10 seconds
setInterval(async () => {
    try {
        const response = await axios.get('http://api:3000/lightbulbs');  // Assuming API service is at api:3000
        const lightbulbs = response.data;

        // Broadcast the entire list of lightbulbs
        broadcast(lightbulbs);
    } catch (error) {
        console.error('Error fetching lightbulb data from API for WebSocket broadcast:', error.message);
    }
}, 3000);  // Poll every 10 seconds

// Axios interceptor for handling add/remove operations
axios.interceptors.response.use(function (response) {
    if (response.config.method === 'post' || response.config.method === 'delete') {
        const eventType = response.config.method === 'post' ? 'add' : 'remove';
        const eventData = {
            type: eventType,
            bulb: response.data  // The new or deleted bulb data
        };

        // Broadcast the add or remove event
        broadcast(eventData);
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

// Setup an HTTP server to listen for WebSocket upgrades
const server = require('http').createServer();
server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname;

    // Handle only WebSocket requests to /websocket path
    if (pathname === '/websocket') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();  // Destroy the socket if the path doesn't match
    }
});

// Start the server on port 8081
server.listen(8081, () => {
    console.log('WebSocket server is listening on port 8081 and path /websocket');
});
