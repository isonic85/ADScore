document.addEventListener("DOMContentLoaded", function () {
    // 🎯 Huvudmeny
    document.getElementById("playOffline").addEventListener("click", function () {
        document.getElementById("mainMenu").classList.add("hidden");
        document.getElementById("offlineMenu").classList.remove("hidden");
    });

    document.getElementById("playOnline").addEventListener("click", function () {
        document.getElementById("mainMenu").classList.add("hidden");
        document.getElementById("onlineMenu").classList.remove("hidden");
    });

    // 🎯 Tillbaka-knappar
    document.getElementById("backToMainMenu").addEventListener("click", function () {
        document.getElementById("offlineMenu").classList.add("hidden");
        document.getElementById("mainMenu").classList.remove("hidden");
    });

    document.getElementById("backToMainMenu2").addEventListener("click", function () {
        document.getElementById("onlineMenu").classList.add("hidden");
        document.getElementById("mainMenu").classList.remove("hidden");
    });

    document.getElementById("backToOnlineMenu").addEventListener("click", function () {
        document.getElementById("gameSettings").classList.add("hidden");
        document.getElementById("onlineMenu").classList.remove("hidden");
    });

    // 🎯 Host-knapp (Välj regler först)
    document.getElementById("hostGame").addEventListener("click", function () {
        document.getElementById("onlineMenu").classList.add("hidden");
        document.getElementById("gameSettings").classList.remove("hidden");
    });

    // 🎯 Skapa match
    document.getElementById("startHosting").addEventListener("click", function () {
        document.getElementById("gameSettings").classList.add("hidden");
        document.getElementById("matchInfo").classList.remove("hidden");

        // Generera en unik spelkod
        let gameCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        document.getElementById("gameCode").textContent = gameCode;
    });

    // 🎯 Joina-knapp
    document.getElementById("joinGame").addEventListener("click", function () {
        let joinCode = document.getElementById("joinCode").value.trim();
        if (joinCode === "") {
            alert("Ange en kod för att joina.");
            return;
        }

        document.getElementById("onlineMenu").classList.add("hidden");
        document.getElementById("matchInfo").classList.remove("hidden");
        document.getElementById("gameCode").textContent = joinCode;
        document.getElementById("playerStatus").textContent = "Väntar på hosten...";
    });

    // 🎯 Starta offline-spel (Inget ändras här, bara navigering)
    document.getElementById("startOfflineGame").addEventListener("click", function () {
        alert("Offline-spelet startas!"); // Här skulle ditt gamla spel laddas
    });
});
