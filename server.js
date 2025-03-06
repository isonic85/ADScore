const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Player connected');
    
    ws.on('message', (message) => {
        console.log('received: %s', message);

        // Skicka meddelandet till den andra spelaren
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
