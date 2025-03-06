/* script.js */
let players = [];

function addPlayer() {
    let playerName = document.getElementById('playerName').value.trim();
    if (playerName) {
        players.push({ name: playerName, score: 501 });
        document.getElementById('playerName').value = '';
        renderPlayers();
    }
}

function updateScore(index, points) {
    if (players[index].score - points >= 0) {
        players[index].score -= points;
    }
    renderPlayers();
}

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
