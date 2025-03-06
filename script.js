let players = [];
let gameScore = 501; // Standardstart för X01

// Uppdaterar vilka spel som finns tillgängliga beroende på kategori
function updateGameOptions() {
    let category = document.getElementById('category').value;
    let gameSelect = document.getElementById('game');

    gameSelect.innerHTML = ''; // Rensa gamla val

    if (category === 'x01') {
        let options = [301, 501, 701];
        options.forEach(score => {
            let option = document.createElement('option');
            option.value = score;
            option.textContent = score;
            gameSelect.appendChild(option);
        });
    }

    gameScore = parseInt(gameSelect.value); // Uppdatera startpoängen
}

// Lägger till en spelare med vald startpoäng
function addPlayer() {
    let playerName = document.getElementById('playerName').value.trim();
    gameScore = parseInt(document.getElementById('game').value); // Hämtar startpoäng från valt spel

    if (playerName) {
        players.push({ name: playerName, score: gameScore });
        document.getElementById('playerName').value = '';
        renderPlayers();
    }
}

// Uppdatera poäng
function updateScore(index, points) {
    if (players[index].score - points >= 0) {
        players[index].score -= points;
    }
    renderPlayers();
}

// Rendera spelarna på skärmen
function renderPlayers() {
    let playersDiv = document.getElementById('players');
    playersDiv.innerHTML = '';

    players.forEach((player, index) => {
        playersDiv.innerHTML += `
            <div class="player-card">
                <h3>${player.name}</h3>
                <p>Poäng: ${player.score}</p>
                <button onclick="updateScore(${index}, 20)">-20</button>
                <button onclick="updateScore(${index}, 50)">-50</button>
                <button onclick="updateScore(${index}, 100)">-100</button>
            </div>
        `;
    });
}

// Initiera val vid start
document.addEventListener("DOMContentLoaded", () => {
    updateGameOptions();
});
