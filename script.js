let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Spelare 1", score: 301, hasStarted: false },
    { name: "Spelare 2", score: 301, hasStarted: false }
];

let currentPlayer = 0;
let throws = [];
const doubleOut = true; // Krav på dubbel för att avsluta spelet
const doubleIn = false; // Krav på dubbel för att börja spelet (kan sättas till true)

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

    // Om Double-In är aktivt och spelaren ännu inte startat
    if (doubleIn && !player.hasStarted) {
        if (![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 50].includes(points)) {
            alert("Du måste starta med en dubbel!");
            return;
        }
        player.hasStarted = true;
    }

    let newScore = player.score - points;

    // Bust-regel: Om spelaren går över eller hamnar på 1, återställs poängen
    if (newScore < 0 || newScore === 1) {
        alert("Bust! Din poäng återställs.");
        newScore = player.score; // Återställ till ursprunglig poäng för rundan
        nextPlayer();
        return;
    }

    // Double-Out-regel: Om spelet ska avslutas måste sista kastet vara en dubbel
    if (doubleOut && newScore === 0) {
        if (![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 50].includes(points)) {
            alert("Du måste avsluta med en dubbel!");
            return;
        }
        alert(player.name + " har vunnit spelet!");
        resetGame();
        return;
    }

    // Uppdatera poäng om ingen bust skett
    player.score = newScore;
    throws.push(points);
    
    renderGame();

    // Efter 3 kast byter vi spelare
    if (throws.length === 3) {
        setTimeout(nextPlayer, 1000);
    }
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
    throws = [];
    renderGame();
}

function resetGame() {
    players.forEach(player => {
        player.score = 301;
        player.hasStarted = false;
    });
    currentPlayer = 0;
    throws = [];
    renderGame();
}

document.addEventListener("DOMContentLoaded", renderGame);
