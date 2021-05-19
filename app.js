// page variables

let gameStatus = true;
let playCount = 0;
let currentPlayer = "player1";
let boardTile = document.querySelectorAll('.board-tile');
let resetBtn = document.querySelector('.reset-btn');
let gameInfo = document.querySelector('.game-info');

let tileObj = {
0: "",
1: "",
2: "",
3: "",
4: "",
5: "",
6: "",
7: "",
8: ""
}

// event functions

function handleTileClick(event) {

    if (event.target.classList.contains('selected') === false && gameStatus) {
        event.target.classList.add('selected')

        let selectedTile = event.target.dataset.index;

        if (currentPlayer === 'player1') { 
            event.target.innerText = "X";
            tileObj[selectedTile] = "x";
        } else { 
            event.target.innerText = "O";
            tileObj[selectedTile] = "o";                 

        } playCount++;
    } compareResults();
}

// game logic

function compareResults() {

    let xOrO = "";
    if (playCount === 9) { 
        itsADraw();
    } else if (currentPlayer === 'player1') {
        xOrO = "x";
        currentPlayer = "player2"
    } else {
        xOrO = "o";
        currentPlayer = "player1"
    }
    if (tileObj[0] == xOrO && tileObj[1] == xOrO && tileObj[2] == xOrO) {
            winnerFunction(xOrO);
    } else if (tileObj[3] == xOrO && tileObj[4] == xOrO && tileObj[5] == xOrO) {
            winnerFunction(xOrO);
    } else if (tileObj[6] == xOrO && tileObj[7] == xOrO && tileObj[8] == xOrO) {
            winnerFunction(xOrO);
    } else if (tileObj[3] == xOrO && tileObj[0] == xOrO && tileObj[6] == xOrO){
            winnerFunction(xOrO);
    } else if (tileObj[1] == xOrO && tileObj[4] == xOrO && tileObj[7] == xOrO) {
            winnerFunction(xOrO);
    } else if (tileObj[2] == xOrO && tileObj[5] == xOrO && tileObj[8] == xOrO) {
            winnerFunction(xOrO);
    } else if (tileObj[0] == xOrO && tileObj[4] == xOrO && tileObj[8] == xOrO) {
            winnerFunction(xOrO);
    } else if (tileObj[6] == xOrO && tileObj[4] == xOrO && tileObj[2] == xOrO) {
            winnerFunction(xOrO);
    }  
}

// win lose or draw functions

function itsADraw() {
    gameInfo.textContent = 'draw'
    gameStatus = false;
}

function winnerFunction(xOrO) {
    if (xOrO === "x") {
        gameInfo.textContent = 'X wins';
    } else {
        gameInfo.textContent = 'O wins'
    } 
    gameStatus = false;
}

function resetAll() {
    gameStatus = true;
    gameInfo.textContent = "";
    playCount = 0;
    currentPlayer = "player1";
    for (let i = 0; i < boardTile.length; i++) {
        boardTile[i].textContent = "";
        boardTile[i].classList.remove('selected');
        tileObj[i] = "";
    }
}
 

// event listeners

for (let i = 0; i < boardTile.length; i++) {
    boardTile[i].addEventListener('click', handleTileClick)
}

resetBtn.addEventListener('click', resetAll);

