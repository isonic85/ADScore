let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Spelare 1", score: parseInt(localStorage.getItem("gameScore")), hasStarted: false },
    { name: "Spelare 2", score: parseInt(localStorage.getItem("gameScore")), hasStarted: false }
];

let currentPlayer = 0;
let throws = [];
let multiplier = 1;
let roundStartScore = players[currentPlayer].score;
const difficulty = localStorage.getItem("gameDifficulty") || "straight-in";
const endRule = localStorage.getItem("gameEndRule") || "double-out";

// Renderar poängtavlan och kastboxar
function renderGame() {
    document.getElementById("player1-name").textContent = players[0].name;
    document.getElementById("player1-score").textContent = players[0].score;
    document.getElementById("player2-name").textContent = players[1].name;
    document.getElementById("player2-score").textContent = players[1].score;

    document.getElementById("throw1").textContent = throws[0] || "-";
    document.getElementById("throw2").textContent = throws[1] || "-";
    document.getElementById("throw3").textContent = throws[2] || "-";
}

// Hanterar multiplikatorval
function selectMultiplier(value) {
    multiplier = value;
    document.querySelectorAll(".multiplier").forEach(button => {
        button.classList.remove("selected");
    });
    event.target.classList.add("selected");
}

// Roterar spelarna
function rotatePlayers() {
    document.querySelector(".scoreboard").classList.add("rotate-animation");

    setTimeout(() => {
        document.querySelector(".scoreboard").classList.remove("rotate-animation");

        currentPlayer = (currentPlayer + 1) % players.length;
        renderGame();
    }, 500);
}

// Registrerar kast
function registerScore(points) {
    let player = players[currentPlayer];
    let finalScore = points * multiplier;

    if (throws.length === 0) {
        roundStartScore = player.score;
    }

    if (throws.length >= 3) {
        return rotatePlayers();
    }

    if (player.score - finalScore < 0 || player.score - finalScore === 1) {
        player.score = roundStartScore;
        return rotatePlayers();
    }

    if (player.score - finalScore === 0 && multiplier >= 2) {
        alert(player.name + " har vunnit spelet!");
        return;
    }

    player.score -= finalScore;
    throws.push(finalScore);
    renderGame();

    if (throws.length === 3) {
        setTimeout(rotatePlayers, 1000);
    }
}

document.addEventListener("DOMContentLoaded", renderGame);
