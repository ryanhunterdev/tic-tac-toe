// page variables

let gameStatus = true;
let playCount = 0;
let currentPlayer = "player1";
let boardTile = document.querySelectorAll('.board-tile');
let gameInfo = document.querySelector('.game-info');
let playAgainDiv = document.querySelector('.play-again');


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

// audio elements

// amen break choops

const amenChop2 = new Audio('./audio/amen-chop-2.wav');
const amenChop3 = new Audio('./audio/amen-chop-3.wav');
const amenChop4 = new Audio('./audio/amen-chop-4.wav');
const amenChop1 = new Audio('./audio/amen-chop-1.wav');
const amenChop5 = new Audio('./audio/amen-chop-5.wav');

const amenChops = [amenChop1, amenChop2,
amenChop3, amenChop4, amenChop5];

let chopCount = 0;

// start end and draw sounds

const gameStartSound = new Audio("./audio/amen-roll-start-of-game.wav");

const gameDrawSound0 = new Audio("./audio/draw-sounds/draw0.wav");
const gameDrawSound1 = new Audio("./audio/draw-sounds/draw1.wav");
const gameDrawSound2 = new Audio("./audio/draw-sounds/draw2.wav");
const gameDrawSound3 = new Audio("./audio/draw-sounds/draw3.wav");
const gameDrawSound4 = new Audio("./audio/draw-sounds/draw4.wav");
const gameDrawSound5 = new Audio("./audio/draw-sounds/draw5.wav");

const drawSounds = [gameDrawSound0, gameDrawSound1, gameDrawSound2, gameDrawSound3, gameDrawSound4, gameDrawSound5];

let drawCount = 0;

const gameWinSound0 = new Audio("./audio/win-sounds/win0.wav");
const gameWinSound1 = new Audio("./audio/win-sounds/win1.wav");
const gameWinSound2 = new Audio("./audio/win-sounds/win2.wav");
const gameWinSound3 = new Audio("./audio/win-sounds/win3.wav");
const gameWinSound4 = new Audio("./audio/win-sounds/win4.wav");
const gameWinSound5 = new Audio("./audio/win-sounds/win5.wav");
const gameWinSound6 = new Audio("./audio/win-sounds/win6.wav");
const gameWinSound7 = new Audio("./audio/win-sounds/win7.wav");
const gameWinSound8 = new Audio("./audio/win-sounds/win8.wav");


const winSounds = [gameWinSound0, gameWinSound1, gameWinSound2, gameWinSound3, gameWinSound4, gameWinSound5, gameWinSound6, gameWinSound7, gameWinSound8];

let winCount = 0;

// event functions

function handleTileClick(event) {

    if (event.target.classList.contains('selected') === false && gameStatus) {
        event.target.classList.add('selected')

        let selectedTile = event.target.dataset.index;

        if (currentPlayer === 'player1') { 
            event.target.innerText = "X";
            tileObj[selectedTile] = "x";
            gameInfo.textContent = "PLAYER 2";
            
        } else { 
            event.target.innerText = "O";
            tileObj[selectedTile] = "o";    
            event.target.classList.add('o-text-color'); 
            gameInfo.textContent = "PLAYER 1";            
            
        } playCount++;

    } if (gameStatus) {
        compareResults();
    }
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
            makeBlink(0, 1, 2);
    } else if (tileObj[3] == xOrO && tileObj[4] == xOrO && tileObj[5] == xOrO) {
            winnerFunction(xOrO);
            makeBlink(3, 4, 5);
    } else if (tileObj[6] == xOrO && tileObj[7] == xOrO && tileObj[8] == xOrO) {
            winnerFunction(xOrO);
            makeBlink(6, 7, 8);
    } else if (tileObj[3] == xOrO && tileObj[0] == xOrO && tileObj[6] == xOrO) {
            winnerFunction(xOrO);
            makeBlink(3, 0, 6);
    } else if (tileObj[1] == xOrO && tileObj[4] == xOrO && tileObj[7] == xOrO) {
            winnerFunction(xOrO);
            makeBlink(1, 4, 7);
    } else if (tileObj[2] == xOrO && tileObj[5] == xOrO && tileObj[8] == xOrO) {
            winnerFunction(xOrO);
            makeBlink(2, 5, 8);
    } else if (tileObj[0] == xOrO && tileObj[4] == xOrO && tileObj[8] == xOrO) {
            winnerFunction(xOrO);
            makeBlink(0, 4, 8);
    } else if (tileObj[6] == xOrO && tileObj[4] == xOrO && tileObj[2] == xOrO) {
            winnerFunction(xOrO);
            makeBlink(6, 4, 2);

    }  playBreakChop();
}

// win lose or draw functions

function itsADraw() {
    gameInfo.textContent = "It's a draw!"
    gameStatus = false;
    playDrawSound();
    playAgain();
}

function winnerFunction(xOrO) {
    gameStatus = false;
    if (xOrO === "x") {
        gameInfo.textContent = 'PLAYER 1 WINS';
    } else {
        gameInfo.textContent = 'PLAYER 2 WINS'
    } 
    playWinSound();
    playAgain();
}

// play again / reset board functions

function playAgain() {
    playAgainDiv.classList.add('play-again-active');
    playAgainDiv.textContent = "PLAY AGAIN?"
    playAgainDiv.addEventListener('click', resetAll);
    for (let i = 0; i < boardTile.length; i++) {
        boardTile[i].classList.add('board-tile-inactive');
    }
}

function resetAll() {
    gameStatus = true;
    gameInfo.textContent = "";
    playCount = 0;
    currentPlayer = "player1";
    gameInfo.textContent = "Player 1";
    chopCount = 0;
    playAgainDiv.classList.remove('play-again-active');
    playAgainDiv.textContent = ""
    gameStartSound.play();
    for (let i = 0; i < boardTile.length; i++) {
        boardTile[i].textContent = "";
        boardTile[i].classList.remove('selected');
        boardTile[i].classList.remove('o-text-color');
        boardTile[i].classList.remove('blink-1')
        tileObj[i] = "";
    }
}

// audio functions

function playBreakChop() {
    if (gameStatus === true) {
        if (chopCount < amenChops.length) {
        amenChops[chopCount].play();
        chopCount++;
        } else {
        chopCount = 0;
        amenChops[chopCount].play();
        }
    } 
}

function playDrawSound() {
    if (drawCount < drawSounds.length) {
        drawSounds[drawCount].play();
        drawCount++;
    } else {
        drawCount = 0;
        amenChops[chopCount].play();
    }
}

function playWinSound() {
    if (gameStatus === false) {
        if (winCount < winSounds.length) {
            winSounds[winCount].play();
            winCount++;
        } else {
            winCount = 0;
            winSounds[winCount].play();
        }
    }
}        

// css animation functions

function makeBlink(index1, index2, index3) {
    boardTile[index1].classList.add('blink-1');
    boardTile[index2].classList.add('blink-1');
    boardTile[index3].classList.add('blink-1');
}
 

// event listeners

for (let i = 0; i < boardTile.length; i++) {
    boardTile[i].addEventListener('click', handleTileClick)
}
