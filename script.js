let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Spelare 1", score: 301 },
    { name: "Spelare 2", score: 301 }
];

let currentPlayer = 0;
let throws = [];

function renderGame() {
    document.getElementById("player1-name").textContent = players[0].name;
    document.getElementById("player1-score").textContent = players[0].score;
    document.getElementById("player2-name").textContent = players[1].name;
    document.getElementById("player2-score").textContent = players[1].score;

    document.getElementById("player1").classList.toggle("active", currentPlayer === 0);
    document.getElementById("player2").classList.toggle("active", currentPlayer === 1);

    document.getElementById("throw1").textContent = throws[0] || "-";
    document.getElementById("throw2").textContent = throws[1] || "-";
    document.getElementById("throw3").textContent = throws[2] || "-";
}

function registerScore(points) {
    if (throws.length < 3) {
        players[currentPlayer].score -= points;
        throws.push(points);
        renderGame();

        if (throws.length === 3) {
            setTimeout(nextPlayer, 1000);
        }
    }
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
    throws = [];
    renderGame();
}

document.addEventListener("DOMContentLoaded", renderGame);
