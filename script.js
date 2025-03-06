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
let model;

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
switchBtn.addEventListener("click", switchCamera);

// Start the game
function startGame() {
    player1Score = 301;
    player2Score = 301;
    updateScore();
    currentThrowElem.textContent = `Player 1's turn`;
    startCamera();
    loadModel();
}

// Stop the game
function stopGame() {
    stopCamera();
}

// Load TensorFlow.js model for dart detection
async function loadModel() {
    model = await cocoSsd.load(); // Load pre-trained model
    console.log("Model loaded!");
    detectDartThrow();
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

// Update the score on the screen
function updateScore() {
    player1ScoreElem.textContent = player1Score;
    player2ScoreElem.textContent = player2Score;
}

// Detect dart throw and calculate points
async function detectDartThrow() {
    if (!model) {
        console.log("Model not loaded yet!");
        return;
    }

    const predictions = await model.detect(video); // Make prediction on the video feed

    // Simulate dart detection based on object detection model
    const dartHit = predictions.find(p => p.class === 'dart'); // Look for 'dart' class in predictions

    if (dartHit) {
        // Simulate assigning points based on where dart hit the board
        let points = Math.floor(Math.random() * 20) + 1; // Random points for testing
        updatePoints(points);
    }

    // Call the detection function again after 100 milliseconds
    setTimeout(detectDartThrow, 100);
}

// Update points for the player based on dart hit
function updatePoints(points) {
    if (currentPlayer === 1) {
        player1Score -= points;
        currentPlayer = 2; // Switch to player 2
    } else {
        player2Score -= points;
        currentPlayer = 1; // Switch to player 1
    }

    currentPointsElem.textContent = points;
    updateScore();
    currentThrowElem.textContent = `Player ${currentPlayer}'s turn`;
}
