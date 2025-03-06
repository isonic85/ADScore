let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Spelare 1", score: 301 },
    { name: "Spelare 2", score: 301 }
];

let currentPlayer = 0;

function renderGame() {
    document.getElementById("player1-name").textContent = players[0].name;
    document.getElementById("player1-score").textContent = players[0].score;
    document.getElementById("player2-name").textContent = players[1].name;
    document.getElementById("player2-score").textContent = players[1].score;

    document.getElementById("player1").classList.toggle("active", currentPlayer === 0);
    document.getElementById("player2").classList.toggle("active", currentPlayer === 1);
}

function registerScore(points) {
    if (players[currentPlayer].score - points >= 0) {
        players[currentPlayer].score -= points;
    }
    renderGame();
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
    renderGame();
}

document.addEventListener("DOMContentLoaded", renderGame);
