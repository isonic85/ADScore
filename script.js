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

function renderGame() {
    const scoreboard = document.querySelector(".scoreboard");
    scoreboard.innerHTML = "";
    
    let prevPlayer = (currentPlayer - 1 + players.length) % players.length;
    let nextPlayer = (currentPlayer + 1) % players.length;
    
    let prevDiv = document.createElement("div");
    prevDiv.classList.add("player", "previous");
    prevDiv.innerHTML = `<h2>${players[prevPlayer].name}</h2><p class="score">${players[prevPlayer].score}</p>`;
    scoreboard.appendChild(prevDiv);
    
    let activeDiv = document.createElement("div");
    activeDiv.classList.add("player", "active");
    activeDiv.innerHTML = `<h2>${players[currentPlayer].name}</h2><p class="score">${players[currentPlayer].score}</p>`;
    scoreboard.appendChild(activeDiv);
    
    let nextDiv = document.createElement("div");
    nextDiv.classList.add("player", "next");
    nextDiv.innerHTML = `<h2>${players[nextPlayer].name}</h2><p class="score">${players[nextPlayer].score}</p>`;
    scoreboard.appendChild(nextDiv);
}

function rotatePlayers() {
    const scoreboard = document.querySelector(".scoreboard");
    scoreboard.classList.add("rotate-animation");
    
    setTimeout(() => {
        scoreboard.classList.remove("rotate-animation");
        currentPlayer = (currentPlayer + 1) % players.length;
        renderGame();
    }, 500);
}

function registerScore(points) {
    let player = players[currentPlayer];

    if (throws.length === 0) {
        roundStartScore = player.score;
    }

    if (throws.length >= 3) {
        alert("Du har kastat 3 gånger! Nästa spelare tur.");
        return setTimeout(rotatePlayers, 500);
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
        return setTimeout(rotatePlayers, 500);
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
