const gameboard = (() => {
    let gameSquare = [...document.querySelectorAll(".game-square")];

    let gameboardValues = [
        "","","",
        "","","",
        "","",""
        ];

    let updateGameboard = (index, value) => {
        if (typeof(index) !== "string") {
            for (let i = 0; i < gameboardValues.length; i++) {
                gameboardValues[i] = "";
            }
            gameFlow.winnerFound = false;
        }
        else {
            gameboardValues[index] = value;
        }
        for (let i = 0; i < gameboardValues.length; i++) {
            gameSquare[i].textContent = gameboardValues[i];
        }
        gameFlow.determineWinner(gameboardValues)
    }
    return {gameboardValues, updateGameboard}
})();

const Player = (name, value) => {
    let play = () => {
        let currentVal = "";
        let triggered = false;
        if (!gameFlow.determineWinner(gameboard.gameboardValues)) {    
            let gameSquare = [...document.querySelectorAll(".game-square")];
            let availableSquare = gameSquare.filter(square => square.textContent === "");
            availableSquare.forEach(square => square.addEventListener("click",
            (e) => {
                if (!triggered && !gameFlow.determineWinner(gameboard.gameboardValues)) {
                    /* triggered = true; */
                    let index = e.target.getAttribute("data-cell");
                    currentVal = value;
                    gameboard.updateGameboard(index, currentVal);
                    gameFlow.determineCurrent(currentVal);
                }
            }))
        }
    }
    return {name, value, play}
}

const gameFlow = (() => {
    const determineCurrent = (val = "X") => {
        if (!gameFlow.determineWinner(gameboard.gameboardValues)) {
            let currentPlayer = "";
            if (val === "X") {
                currentPlayer = player2;
            }
            else if (val === "O") {
                currentPlayer = player1;
            }
            else {
                currentPlayer = "";
            }
            setTimeout(displayCurrent, 500, currentPlayer);
            currentPlayer.play();
        }
    };
    const displayCurrent = (currentPlayer) => {
        if (!gameFlow.determineWinner(gameboard.gameboardValues)) {
            document.querySelector(".current-player").textContent = `current player: ${currentPlayer.name}`;
        }
    };

    let winnerFound = false;

    const determineWinner = (gameArray) => {
        const player1name = player1.name;
        const player2name = player2.name;
        let winningPlayerAlert = document.querySelector(".current-player");
        let winningVal = "";

        //check rows
        if (gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]) {
            winningVal = gameArray[0];
        }
        else if (gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) {
            winningVal = gameArray[3];
        }
        else if (gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) {
            winningVal = gameArray[6];
        }

        //check columns
        else if (gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]) {
            winningVal = gameArray[0];
        }
        else if (gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]) {
            winningVal = gameArray[1];
        }
        else if (gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]) {
            winningVal = gameArray[2];
        }

        //check diagonals
        else if (gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) {
            winningVal = gameArray[0];
        }
        else if (gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) {
            winningVal = gameArray[2];
        }

        //check winner or tie
        if (winningVal === "X") {
            winningPlayerAlert.textContent = `${player1name} has won the game`; 
            return winnerFound = true
        }
        else if (winningVal === "O") {
            winningPlayerAlert.textContent = `${player2name} has won the game`; 
            return winnerFound = true
        }
        else if (gameArray.indexOf("") === -1 && winningVal === "") {
            winningPlayerAlert.textContent = "It's a Tie"; 
            return winnerFound = true
        }
    }    
    return {determineCurrent, displayCurrent, determineWinner, winnerFound}
})();

const startGame = () => {
    let player1Name = document.querySelector("#player-1-name").value;
    let player2Name = document.querySelector("#player-2-name").value;
    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");
    let nameFields = document.querySelectorAll("input");
    nameFields.forEach(input => input.value = "");
    document.querySelector("form").classList.add("hide");
    document.querySelector(".restart-button").classList.remove("hide");
    let currentPlayer = player1;
    currentPlayer.play();
    gameFlow.displayCurrent(currentPlayer)
    gameFlow.determineWinner([], player1, player2)
};

let submit = document.querySelector(".submit-player-names");
submit.addEventListener("click", startGame);

let restart = document.querySelector(".restart-button");
restart.addEventListener("click", gameboard.updateGameboard);




