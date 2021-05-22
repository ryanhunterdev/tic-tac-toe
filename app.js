/************************************ 

page variables

**************************************/

let gameStatus = true;
let soundOn = true;
let playCount = 0;
let currentPlayer = "player1";
let boardTile = document.querySelectorAll('.board-tile__marker');
let gameInfo = document.querySelector('.game-info');
let playAgainDiv = document.querySelector('.play-again');
let statusUpdate = document.querySelector('.status-update');
let soundToggle = document.querySelector('.sound-toggle');
let soundOnOff = document.querySelector('.sound-on-off')

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

/************************************ 

Audio elements

**************************************/

// amen break choops

const amenChop2 = new Audio('./audio/amen-chop-2.mp3');
const amenChop3 = new Audio('./audio/amen-chop-3.mp3');
const amenChop4 = new Audio('./audio/amen-chop-4.mp3');
const amenChop1 = new Audio('./audio/amen-chop-1.mp3');
const amenChop5 = new Audio('./audio/amen-chop-5.mp3');

const amenChops = [amenChop1, amenChop2,
amenChop3, amenChop4, amenChop5];

for (let i = 0; i < amenChops.length; i++) {
    amenChops[i].volume = .7;
}

let chopCount = 0;

// start end and draw sounds

const gameStartSound = new Audio("./audio/amen-roll-start-of-game.mp3");
gameStartSound.volume = .7;

const gameDrawSound0 = new Audio("./audio/draw-sounds/draw0.mp3");
const gameDrawSound1 = new Audio("./audio/draw-sounds/draw1.mp3");
const gameDrawSound2 = new Audio("./audio/draw-sounds/draw2.mp3");
const gameDrawSound3 = new Audio("./audio/draw-sounds/draw3.mp3");
const gameDrawSound4 = new Audio("./audio/draw-sounds/draw4.mp3");
const gameDrawSound5 = new Audio("./audio/draw-sounds/draw5.mp3");

const drawSounds = [gameDrawSound0, gameDrawSound1, gameDrawSound2, gameDrawSound3, gameDrawSound4, gameDrawSound5];

for (let i = 0; i < drawSounds.length; i++) {
    drawSounds[i].volume = .7;
}

let drawCount = 0;

const gameWinSound0 = new Audio("./audio/win-sounds/win0.mp3");
const gameWinSound1 = new Audio("./audio/win-sounds/win1.mp3");
const gameWinSound2 = new Audio("./audio/win-sounds/win2.mp3");
const gameWinSound3 = new Audio("./audio/win-sounds/win3.mp3");
const gameWinSound4 = new Audio("./audio/win-sounds/win4.mp3");
const gameWinSound5 = new Audio("./audio/win-sounds/win5.mp3");
const gameWinSound6 = new Audio("./audio/win-sounds/win6.mp3");
const gameWinSound7 = new Audio("./audio/win-sounds/win7.mp3");
const gameWinSound8 = new Audio("./audio/win-sounds/win8.mp3");


const winSounds = [gameWinSound0, gameWinSound1, gameWinSound2, gameWinSound3, gameWinSound4, gameWinSound5, gameWinSound6, gameWinSound7, gameWinSound8];

for (let i = 0; i < winSounds.length; i++) {
    winSounds[i].volume = .7;
}

let winCount = 0;

/************************************ 

Event functions

**************************************/

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

/************************************ 

Game Logic

**************************************/

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

/************************************ 

win lose or draw functions

**************************************/

function itsADraw() {
    gameInfo.textContent = "DRAW"
    gameStatus = false;
    statusUpdate.textContent = "INACTIVE";
    playDrawSound();
    playAgain();
}

function winnerFunction(xOrO) {
    gameStatus = false;
    statusUpdate.textContent = "INACTIVE";
    if (xOrO === "x") {
        gameInfo.textContent = 'PLAYER 1 WINS';
    } else {
        gameInfo.textContent = 'PLAYER 2 WINS'
    } 
    playWinSound();
    playAgain();
}

/************************************ 

play again, reset functions

**************************************/

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
    gameInfo.textContent = "PLAYER 1";
    chopCount = 0;
    playAgainDiv.classList.remove('play-again-active');
    playAgainDiv.textContent = "";
    statusUpdate.textContent = "ACTIVE";
    gameStartSound.play();
    for (let i = 0; i < boardTile.length; i++) {
        boardTile[i].textContent = "";
        boardTile[i].classList.remove('selected');
        boardTile[i].classList.remove('o-text-color');
        boardTile[i].classList.remove('blink-1')
        tileObj[i] = "";
    }
}

/************************************ 

audio functions

**************************************/

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

// wanna make this more precise

function toggleSound() {
    
    if (soundOn) {
        soundOn = false;
        soundOnOff.classList.add('sound-toggle-off');
        soundOnOff.textContent = "OFF";
        for (let i = 0; i < amenChops.length; i++) {
            amenChops[i].volume = 0;
        }
        for (let i = 0; i < drawSounds.length; i++) {
            drawSounds[i].volume = 0;
        }
        for (let i = 0; i < winSounds.length; i++) {
            winSounds[i].volume = 0;
        }
        gameStartSound.volume = 0;
    } else {
        soundOn = true;
        soundOnOff.classList.remove('sound-toggle-off');
        soundOnOff.textContent = "ON";
        for (let i = 0; i < amenChops.length; i++) {
            amenChops[i].volume = .7;
        }
        for (let i = 0; i < drawSounds.length; i++) {
            drawSounds[i].volume = .7;
        }
        for (let i = 0; i < winSounds.length; i++) {
            winSounds[i].volume = .7;
        }
        gameStartSound.volume = .7;
    }
}   

/************************************ 

CSS animation function

**************************************/

function makeBlink(index1, index2, index3) {
    boardTile[index1].classList.add('blink-1');
    boardTile[index2].classList.add('blink-1');
    boardTile[index3].classList.add('blink-1');
}
 

/************************************ 

Event listeners

**************************************/

for (let i = 0; i < boardTile.length; i++) {
    boardTile[i].addEventListener('click', handleTileClick);
}

soundToggle.addEventListener('click', toggleSound)
