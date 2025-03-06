const startBtn = document.getElementById('startBtn');
const player1ScoreInput = document.getElementById('player1Score');
const player2ScoreInput = document.getElementById('player2Score');
const player1Video = document.getElementById('player1Video');
const player2Video = document.getElementById('player2Video');

let localStream;
let peerConnection;
const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

// Signalering server (WebSocket server)
const socket = new WebSocket('ws://localhost:8080');

// När vi ansluter till signaleringsservern
socket.onopen = () => {
    console.log('Connected to the signaling server');
};

// När vi tar emot ett meddelande från servern
socket.onmessage = async (message) => {
    const data = JSON.parse(message.data);

    if (data.offer) {
        await handleOffer(data.offer);
    } else if (data.answer) {
        await handleAnswer(data.answer);
    } else if (data.iceCandidate) {
        await handleIceCandidate(data.iceCandidate);
    }
};

// Starta spelet och skapa en WebRTC-anslutning
startBtn.addEventListener('click', async () => {
    await startGame();
    await startLocalVideo();
    await createPeerConnection();
});

// Starta lokala kameran
async function startLocalVideo() {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true });
    player1Video.srcObject = localStream;
}

// Skapa peer-to-peer WebRTC-anslutning
async function createPeerConnection() {
    peerConnection = new RTCPeerConnection(configuration);
    
    // Lägg till den lokala videoströmmen till anslutningen
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Ta emot den andra spelarens video
    peerConnection.ontrack = (event) => {
        player2Video.srcObject = event.streams[0];
    };

    // Skicka en offer till den andra spelaren
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Skicka offer till servern
    socket.send(JSON.stringify({ offer }));
}

// Hantera erbjudandet från den andra spelaren
async function handleOffer(offer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Skicka svar tillbaka till den andra spelaren
    socket.send(JSON.stringify({ answer }));
}

// Hantera svaret från den andra spelaren
async function handleAnswer(answer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

// Hantera ICE-kandidater
async function handleIceCandidate(iceCandidate) {
    try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
    } catch (error) {
        console.error('Error adding received ICE candidate', error);
    }
}

// När poäng matas in, uppdatera spelets poäng
player1ScoreInput.addEventListener('input', () => {
    console.log('Player 1 score:', player1ScoreInput.value);
});

player2ScoreInput.addEventListener('input', () => {
    console.log('Player 2 score:', player2ScoreInput.value);
});
