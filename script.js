// Laddar spelare från localStorage eller skapar standardspelare
let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Spelare 1", score: parseInt(localStorage.getItem("gameScore")) || 301, hasStarted: false },
    { name: "Spelare 2", score: parseInt(localStorage.getItem("gameScore")) || 301, hasStarted: false }
];

let currentPlayer = 0;
let throws = [];
let multiplier = 1;
let roundStartScore = players[currentPlayer].score;
const difficulty = localStorage.getItem("gameDifficulty") || "straight-in";
const endRule = localStorage.getItem("gameEndRule") || "double-out";

// Renderar poängtavlan och kastboxar
function renderGame() {
    const scoreboard = document.querySelector(".scoreboard");
    scoreboard.innerHTML = ""; // Rensar poängtavlan innan vi renderar den igen

    players.forEach((player, index) => {
        let playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        
        if (index === currentPlayer) {
            playerDiv.classList.add("active"); // Endast aktiv spelare syns
        }

        playerDiv.innerHTML = `<h2>${player.name}</h2><p class="score">${player.score}</p>`;
        scoreboard.appendChild(playerDiv);
    });

    // Uppdaterar kastboxarna
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

// Registrerar kast och beräknar poäng
function registerScore(points) {
    let player = players[currentPlayer];

    if (throws.length === 0) {
        roundStartScore = player.score; // Spara startpoängen vid första kastet
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
    currentPlayer = (currentPlayer + 1) % players.length; // Cirkulerar genom spelarna
    throws = [];
    roundStartScore = players[currentPlayer].score;
    renderGame();
}

// Laddar spelets initiala tillstånd
document.addEventListener("DOMContentLoaded", renderGame);
