const apiUrl = window.config.API_URL;
const wsUrl = window.config.WEBSOCKET_URL;

const container = document.getElementById('lightbulbs-container');
console.log("app.js is loaded and running!");

// Function to create a lightbulb element
function createLightbulbElement(id, name, status) {
    const lightbulb = document.createElement('div');
    lightbulb.classList.add('lightbulb');
    lightbulb.id = id;  // Use the lightbulb's id as the unique identifier

    // Set the lightbulb HTML (with inner elements for styling)
    lightbulb.innerHTML = `
        <div class="lightbulb-base"></div>
        <div class="lightbulb-glass"></div>
        <div class="lightbulb-glow"></div>
        <p>${name}</p>
    `;

    // Add the 'on' class if the lightbulb status is "on"
    if (status === 'on') {
        lightbulb.classList.add('on');
    }

    // Append the lightbulb to the container
    container.appendChild(lightbulb);
}

// Function to remove a lightbulb element
function removeLightbulbElement(id) {
    const lightbulb = document.getElementById(id);
    if (lightbulb) {
        container.removeChild(lightbulb);
    }
}

// Function to update the lightbulb's status
function updateLightbulb(id, status) {
    const lightbulb = document.getElementById(id);  // Find lightbulb by its ID (id)
    if (lightbulb) {
        if (status === 'on') {
            lightbulb.classList.add('on');  // Add 'on' class to turn the bulb on
        } else {
            lightbulb.classList.remove('on');  // Remove 'on' class to turn the bulb off
        }
    }
}

// Function to sync the DOM with the lightbulb list from the WebSocket or API
function syncLightbulbs(lightbulbs) {
    // Convert lightbulb data into a map for easy lookup by ID
    const bulbsMap = {};
    lightbulbs.forEach(bulb => {
        bulbsMap[bulb.id] = bulb;
    });

    // Get all existing bulbs in the DOM
    const currentBulbsInDOM = Array.from(container.children);

    // Remove bulbs from DOM that are no longer in the bulbsMap
    currentBulbsInDOM.forEach(bulbElement => {
        const bulbId = bulbElement.id;
        if (!bulbsMap[bulbId]) {
            console.log(`Removing bulb with id ${bulbId}`);
            removeLightbulbElement(bulbId);
        }
    });

    // Add or update bulbs
    lightbulbs.forEach(bulb => {
        const existingBulb = document.getElementById(bulb.id);
        if (existingBulb) {
            // Update existing bulb
            updateLightbulb(bulb.id, bulb.status);
        } else {
            // Create a new bulb
            console.log(`Adding new bulb: ${bulb.name} (${bulb.id})`);
            createLightbulbElement(bulb.id, bulb.name, bulb.status);
        }
    });
}

// Fetch all lightbulbs from the API (initial load)
async function fetchLightbulbs() {
    const response = await fetch(apiUrl);
    const lightbulbs = await response.json();

    // Sync bulbs to the DOM
    syncLightbulbs(lightbulbs);
}

// Initialize the app by fetching the initial state of lightbulbs
fetchLightbulbs();

// Set up WebSocket connection
const socket = new WebSocket(wsUrl);

// Listen for connection open event
socket.addEventListener('open', function () {
    console.log("WebSocket connection established");
});

// Listen for errors
socket.addEventListener('error', function (event) {
    console.error("WebSocket error observed:", event);
});

// Listen for WebSocket messages
socket.addEventListener('message', function (event) {
    const lightbulbs = JSON.parse(event.data);
    console.log("Received lightbulb data via WebSocket:", lightbulbs);

    // Sync bulbs to the DOM
    syncLightbulbs(lightbulbs);
});

// Listen for close event
socket.addEventListener('close', function () {
    console.log("WebSocket connection closed");
});
