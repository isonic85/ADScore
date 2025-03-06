const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const switchBtn = document.getElementById("switchBtn");

const player1ScoreElem = document.getElementById("player1Score");
const player2ScoreElem = document.getElementById("player2Score");
const currentThrowElem = document.getElementById("currentThrow");
const currentPointsElem = document.getElementById("currentPoints");

let stream;
let currentDevice = "user"; // Start with front camera
let player1Score = 301;
let player2Score = 301;
let currentPlayer = 1;

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
switchBtn.addEventListener("click", switchCamera);

// Start the game
function startGame() {
    player1Score = 301;
    player2Score = 301;
    updateScore();
    startCamera();
}

// Stop the game
function stopGame() {
    stopCamera();
}

// Start the camera
function startCamera() {
    if (stream) stopCamera();  // Stop the current camera stream

    navigator.mediaDevices.getUserMedia({ video: { facingMode: currentDevice } })
        .then((newStream) => {
            video.srcObject = newStream;
            stream = newStream;
        })
        .catch((err) => {
            console.log("Error accessing camera: ", err);
            alert("Camera access denied. Please allow the camera in your browser settings.");
        });
}

// Stop the camera
function stopCamera() {
    if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
    }
}

// Switch between front and back camera
function switchCamera() {
    currentDevice = currentDevice === "user" ? "environment" : "user";
    stopCamera();
    startCamera();
}

// Update the score
function updateScore() {
    player1ScoreElem.textContent = player1Score;
    player2ScoreElem.textContent = player2Score;
}

// Simulate a dartboard hit
function detectDartHit() {
    // Simulate a random hit (in a real app, this would come from camera analysis)
    let points = Math.floor(Math.random() * 20) + 1; // Random points between 1 and 20
    updatePoints(points);
}

// Update the points based on dart hit
function updatePoints(points) {
    if (currentPlayer === 1) {
        player1Score -= points;
        currentPlayer = 2;
    } else {
        player2Score -= points;
        currentPlayer = 1;
    }
    currentPointsElem.textContent = points;
    updateScore();
    currentThrowElem.textContent = `Player ${currentPlayer}`;
}

// Simulate a round every 5 seconds for testing
setInterval(detectDartHit, 5000);
