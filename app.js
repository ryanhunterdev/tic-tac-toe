// page variables

let gameStatus = true;
let playCount = 0;
let currentPlayer = "player1";
let boardTile = document.querySelectorAll('.board-tile');
let resetBtn = document.querySelector('.reset-btn');
let player1Choices = [];
let player2Choices = [];

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

// event functions

function handleTileClick(event) {
    if (event.target.classList.contains('selected') === false) {
        event.target.classList.add('selected')
        let gridChoice = event.target.dataset.index;
        updatePlayerArray(gridChoice);
    } else {
        console.log('already selected')
    }
}

function updatePlayerArray(gridChoice) {
    if (currentPlayer === "player1") {
        player1Choices.push(gridChoice);
        console.log(player1Choices);
    } else {
        player2Choices.push(gridChoice);
    }
    playCount++;
    comparePlayerArray();
}



// event listeners

for (let i = 0; i < boardTile.length; i++) {
    boardTile[i].addEventListener('click', handleTileClick)
}
