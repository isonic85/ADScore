document.addEventListener("DOMContentLoaded", function () {
    // Hämta och sätt tidigare spelarnamn om det finns
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
        document.getElementById("playerName").value = savedName;
    }

    // Hämta och markera tidigare spelläge om det finns
    const savedGameMode = localStorage.getItem("gameMode");
    if (savedGameMode) {
        document.querySelectorAll(".multiplier").forEach(button => {
            if (button.getAttribute("data-mode") === savedGameMode) {
                button.classList.add("selected");
            }
        });
    }

    // Hämta och sätt tidigare spelval om det finns
    const savedGame = localStorage.getItem("selectedGame");
    if (savedGame) {
        document.getElementById("gameSelect").value = savedGame;
    }
});

// Spara spelarnamn i LocalStorage
function savePlayerName() {
    const playerName = document.getElementById("playerName").value.trim();
    if (playerName !== "") {
        localStorage.setItem("playerName", playerName);
        alert("Ditt namn har sparats!");
    }
}

// Hantera val av spelläge (Offline, Create, Join)
function selectGameMode(mode) {
    localStorage.setItem("gameMode", mode);
    
    // Ta bort markering från alla knappar
    document.querySelectorAll(".multiplier").forEach(button => {
        button.classList.remove("selected");
    });

    // Markera vald knapp
    event.target.classList.add("selected");
}

// Starta spelet och spara inställningar
function startGame() {
    const selectedGame = document.getElementById("gameSelect").value;
    localStorage.setItem("selectedGame", selectedGame);
    window.location.href = "game.html"; // Navigera vidare
}
