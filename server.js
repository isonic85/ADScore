const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // WebSocket-servern lyssnar på port 8080

let players = [];

wss.on('connection', (ws) => {
    console.log('A new player connected');
    players.push(ws);

    // Skicka tillbaka meddelanden till den andra spelaren
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Skicka meddelandet till alla anslutna spelare
        players.forEach(player => {
            if (player !== ws && player.readyState === WebSocket.OPEN) {
                player.send(message);
            }
        });
    });

    // Hantera när en spelare kopplar bort
    ws.on('close', () => {
        console.log('A player disconnected');
        players = players.filter(player => player !== ws);
    });
});
