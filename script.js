const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const switchBtn = document.getElementById("switchBtn");

let stream;
let currentDevice = "user"; // Start with front camera

startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", stopCamera);
switchBtn.addEventListener("click", switchCamera);

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

function stopCamera() {
    if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
    }
}

function switchCamera() {
    currentDevice = currentDevice === "user" ? "environment" : "user";
    stopCamera();
    startCamera();
}

// Example functions for score tracking, can be expanded
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

function updateScore(points) {
    if (currentPlayer === 1) {
        player1Score += points;
        currentPlayer = 2;
    } else {
        player2Score += points;
        currentPlayer = 1;
    }

    document.getElementById("player1Score").textContent = player1Score;
    document.getElementById("player2Score").textContent = player2Score;
}

// Placeholder for detecting dartboard hits
function detectDartHit() {
    // Add logic for dartboard hit detection and score updating
    let points = Math.floor(Math.random() * 20) + 1; // Simulated random score for testing
    updateScore(points);
}
