const WebSocket = require('ws');
const axios = require('axios');

const wss = new WebSocket.Server({ port: 8081 });

// Broadcast a message to all connected clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Listen for WebSocket connections
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

        // Instead of broadcasting each bulb individually, broadcast the entire list
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

        // Broadcast the add or remove event (not needed if you're broadcasting full list regularly)
        broadcast(eventData);
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
