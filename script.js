let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Spelare 1", score: parseInt(localStorage.getItem("gameScore")), hasStarted: false },
    { name: "Spelare 2", score: parseInt(localStorage.getItem("gameScore")), hasStarted: false }
];

let currentPlayer = 0;
let throws = [];
const difficulty = localStorage.getItem("gameDifficulty") || "straight-in";
const endRule = localStorage.getItem("gameEndRule") || "double-out";

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
    let player = players[currentPlayer];

    // Double-In och Master-In regler
    if (difficulty === "double-in" && !player.hasStarted) {
        if (![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 50].includes(points)) {
            alert("Du måste starta med en dubbel!");
            return;
        }
        player.hasStarted = true;
    }

    if (difficulty === "master-in" && !player.hasStarted) {
        if (![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 50, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60].includes(points)) {
            alert("Du måste starta med en dubbel eller trippel!");
            return;
        }
        player.hasStarted = true;
    }

    let newScore = player.score - points;

    // Bust-regel
    if (newScore < 0 || newScore === 1) {
        alert("Bust! Din poäng återställs.");
        return nextPlayer();
    }

    // Double-Out och Master-Out regler
    if (newScore === 0) {
        if (endRule === "double-out" && ![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 50].includes(points)) {
            alert("Du måste avsluta med en dubbel!");
            return;
        }
        if (endRule === "master-out" && ![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 50, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60].includes(points)) {
            alert("Du måste avsluta med en dubbel eller trippel!");
            return;
        }
        alert(player.name + " har vunnit spelet!");
        resetGame();
        return;
    }

    player.score = newScore;
    throws.push(points);

    renderGame();

    if (throws.length === 3) {
        setTimeout(nextPlayer, 1000);
    }
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
    throws = [];
    renderGame();
}

document.addEventListener("DOMContentLoaded", renderGame);
