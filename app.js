// page variables

let gameStatus = true;
let playCount = 0;
let currentPlayer = "player1";
let boardTile = document.querySelectorAll('.board-tile');
let gameInfo = document.querySelector('.game-info');
let playAgainDiv = document.querySelector('.play-again');
playAgainDiv.textContent = "Player 1's move";

// audio elements

var amenChop1 = new Audio('./audio/amen-chop-1.wav');
var amenChop2 = new Audio('./audio/amen-chop-2.wav');
var amenChop3 = new Audio('./audio/amen-chop-3.wav');
var amenChop4 = new Audio('./audio/amen-chop-4.wav');
var amenChop5 = new Audio('./audio/amen-chop-5.wav');

const amenChops = [amenChop1, amenChop2,
amenChop3, amenChop4, amenChop5];

let chopCount = 0;


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
            playAgainDiv.textContent = "Player 2's move";
            playBreakChop();
        } else { 
            event.target.innerText = "O";
            tileObj[selectedTile] = "o";     
            playAgainDiv.textContent = "Player 1's move";            
            playBreakChop();
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
    gameInfo.textContent = "It's a draw!"
    gameStatus = false;
    playAgain();
}

function winnerFunction(xOrO) {
    if (xOrO === "x") {
        gameInfo.textContent = 'Player 1 wins!';
    } else {
        gameInfo.textContent = 'Player 2 wins!'
    } 
    gameStatus = false;
    playAgain();
    
}

// play again / reset board functions

function playAgain() {
    playAgainDiv.classList.add('play-again-active');
    playAgainDiv.textContent = "play again"
    playAgainDiv.addEventListener('click', resetAll);
}

function resetAll() {
    gameStatus = true;
    gameInfo.textContent = "";
    playCount = 0;
    currentPlayer = "player1";
    playAgainDiv.textContent = "Player 1's move";
    playAgainDiv.classList.remove('play-again-active');
    for (let i = 0; i < boardTile.length; i++) {
        boardTile[i].textContent = "";
        boardTile[i].classList.remove('selected');
        tileObj[i] = "";
    }
}

// audio functions

function playBreakChop() {
    if (chopCount < amenChops.length) {
        amenChops[chopCount].play();
        chopCount++
    } else {
        chopCount = 0;
        amenChops[chopCount].play();
    }
}
 

// event listeners

for (let i = 0; i < boardTile.length; i++) {
    boardTile[i].addEventListener('click', handleTileClick)
}


