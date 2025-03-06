let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Spelare 1", score: parseInt(localStorage.getItem("gameScore")), hasStarted: false },
    { name: "Spelare 2", score: parseInt(localStorage.getItem("gameScore")), hasStarted: false }
];

let currentPlayer = 0;
let throws = [];
let multiplier = 1;
let roundStartScore = players[currentPlayer].score; // Spara poängen vid rundans början
const difficulty = localStorage.getItem("gameDifficulty") || "straight-in";
const endRule = localStorage.getItem("gameEndRule") || "double-out";

function renderGame() {
    const scoreboard = document.querySelector(".scoreboard");
    scoreboard.innerHTML = "";

    players.forEach((player, index) => {
        let playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        if (index === currentPlayer) playerDiv.classList.add("active");
        playerDiv.innerHTML = `<h2>${player.name}</h2><p class="score">${player.score}</p>`;
        scoreboard.appendChild(playerDiv);
    });
}

function rotatePlayers() {
    currentPlayer = (currentPlayer + 1) % players.length;
    renderGame();
}

function selectMultiplier(value) {
    multiplier = value;
    document.querySelectorAll(".multiplier").forEach(button => {
        button.classList.remove("selected");
    });
    event.target.classList.add("selected");
}

function registerScore(points) {
    let player = players[currentPlayer];

    if (throws.length === 0) {
        roundStartScore = player.score; // Spara startpoängen vid första kastet
    }

    if (throws.length >= 3) {
        alert("Du har kastat 3 gånger! Nästa spelare tur.");
        return rotatePlayers();
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
        player.score = roundStartScore; // Återställ till poängen vid rundans början
        return rotatePlayers();
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
        setTimeout(rotatePlayers, 1000);
    }
}

document.addEventListener("DOMContentLoaded", renderGame);
