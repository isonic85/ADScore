// Spara spelarnamn i LocalStorage
function savePlayerName() {
    const playerName = document.getElementById("playerName").value;
    if (playerName.trim() !== "") {
        localStorage.setItem("playerName", playerName);
        alert("Ditt namn har sparats!");
    }
}

// Hantera val av spelläge (Offline, Create, Join)
function selectGameMode(mode) {
    localStorage.setItem("gameMode", mode);
    document.querySelectorAll(".multiplier").forEach(button => {
        button.classList.remove("selected");
    });
    event.target.classList.add("selected");
}

// Starta spelet och spara inställningar
function startGame() {
    const selectedGame = document.getElementById("gameSelect").value;
    localStorage.setItem("selectedGame", selectedGame);
    window.location.href = "game.html"; // Navigera vidare
}

// Ladda sparade inställningar vid sidstart
document.addEventListener("DOMContentLoaded", function () {
    // Hämta och sätt tidigare spelarnamn
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
        document.getElementById("playerName").value = savedName;
    }

    // Hämta och markera tidigare spelläge
    const savedGameMode = localStorage.getItem("gameMode");
    if (savedGameMode) {
        document.querySelectorAll(".multiplier").forEach(button => {
            if (button.textContent.toLowerCase() === savedGameMode) {
                button.classList.add("selected");
            }
        });
    }
});
