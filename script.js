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

    document.getElementById("player1").classList.toggle("active", currentPlayer === 0);
    document.getElementById("player2").classList.toggle("active", currentPlayer === 1);
}

// Hanterar multiplikatorval
function selectMultiplier(value) {
    multiplier = value;
    document.querySelectorAll(".multiplier").forEach(button => {
        button.classList.remove("selected");
    });
    event.target.classList.add("selected");
}

// Registrerar kast och beräknar poäng
function registerScore(points) {
    let player = players[currentPlayer];

    if (throws.length === 0) {
        roundStartScore = player.score;
    }

    if (throws.length >= 3) {
        alert("Du har kastat 3 gånger! Nästa spelare tur.");
        return nextPlayer();
    }

    let finalScore = points * multiplier;

    if (difficulty === "double-in" && !player.hasStarted) {
        if (multiplier !== 2) {
            alert("Du måste starta med en dubbel!");
            return;
        }
        player.hasStarted = true;
    }

    if (difficulty === "master-in" && !player.hasStarted) {
        if (multiplier < 2) {
            alert("Du måste starta med en dubbel eller trippel!");
            return;
        }
        player.hasStarted = true;
    }

    let newScore = player.score - finalScore;

    if (newScore < 0 || newScore === 1) {
        alert("Bust! Poängen återställs.");
        player.score = roundStartScore;
        return nextPlayer();
    }

    if (newScore === 0) {
        if (endRule === "double-out" && multiplier !== 2) {
            alert("Du måste avsluta med en dubbel!");
            return;
        }
        if (endRule === "master-out" && multiplier < 2) {
            alert("Du måste avsluta med en dubbel eller trippel!");
            return;
        }
        alert(player.name + " har vunnit spelet!");
        resetGame();
        return;
    }

    player.score = newScore;
    throws.push(finalScore);
    renderGame();

    if (throws.length === 3) {
        setTimeout(nextPlayer, 1000);
    }
}

// Växlar till nästa spelare
function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
    throws = [];
    roundStartScore = players[currentPlayer].score;
    renderGame();
}

// Laddar spelets initiala tillstånd
document.addEventListener("DOMContentLoaded", renderGame);
