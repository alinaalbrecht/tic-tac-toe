const gameboard = (() => {
    let gameSquare = [...document.querySelectorAll(".game-square")];
    let gameboardValues = [
        "","","",
        "","","",
        "","",""
        ];

    let updateGameboard = (index, value) => {
        gameboardValues[index] = value;
        
        for (let i = 0; i < gameboardValues.length; i++) {
        gameSquare[i].textContent = gameboardValues[i];}
        gameFlow.determineWinner(gameboardValues)

    }

    return {
        gameboardValues,
        updateGameboard
    }
})();

const Player = (name, value) => {
    let play = () => {
        let currentVal = "";
        let triggered = false;
        let gameSquare = [...document.querySelectorAll(".game-square")];
        let availableSquare = gameSquare.filter(square => square.textContent === "");
        availableSquare.forEach(square => square.addEventListener("click",
        (e) => {
            if (!triggered) {
                triggered = true;
                let index = e.target.getAttribute("data-cell");
                currentVal = value
                gameboard.updateGameboard(index, currentVal);
                gameFlow.determineCurrent(currentVal);
            }
        }))
    }
    return {name, value, play}
}

const player1 = Player("nathaniel", "X")
const player2 = Player("biene", "O")

const gameFlow = (() => {
    const determineCurrent = (val) => {
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
    currentPlayer.play(currentPlayer);
    };

    const displayCurrent = (currentPlayer) => {
        let currentPlayerName = currentPlayer.name;
        let currentPlayerAlert = document.querySelector(".current-player")
                            .textContent = `current player: ${currentPlayer.name}`;
    };

    const determineWinner = (gameArray) => {
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
            console.log("player1 has won the game")
        }
        else if (winningVal === "O") {
            console.log("player2 has won the game")
        }
        else if (gameArray.indexOf("") === -1 && winningVal === "") {
            console.log("it's a tie")
        }
    }
    return {determineCurrent, displayCurrent, determineWinner}
})();

let startGame = (() => {
    let currentPlayer = player1;
    currentPlayer.play();
    gameFlow.displayCurrent(currentPlayer)
})();