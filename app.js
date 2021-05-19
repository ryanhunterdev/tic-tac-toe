// page variables

let gameStatus = true;
let playCount = 0;
let currentPlayer = "player1";
let boardTile = document.querySelectorAll('.board-tile');
let resetBtn = document.querySelector('.reset-btn');
let gameInfo = document.querySelector('.game-info');

let t0 = "";
let t1 = "";
let t2 = "";
let t3 = "";
let t4 = "";
let t5 = "";
let t6 = "";
let t7 = "";
let t8 = "";


// event functions

function handleTileClick(event) {
    //debugger
    if (event.target.classList.contains('selected') === false && gameStatus) {
        event.target.classList.add('selected')
        
        if (currentPlayer === 'player1') { 
            event.target.innerText = "X";
            playCount++;
            if (event.target.dataset.index === "t0") {
            t0 = "x";
        
            } else if (event.target.dataset.index === "t1") {
            t1 = "x";
    
            } else if (event.target.dataset.index === "t2") {
            t2 = "x";
       
            } else if (event.target.dataset.index === "t3") {
            t3 = "x";
        
            } else if (event.target.dataset.index === "t4") {
            t4 = "x";
    
            } else if (event.target.dataset.index === "t5") {
            t5 = "x";

            } else if (event.target.dataset.index === "t6") {
            t6 = "x";
  
            } else if (event.target.dataset.index === "t7") {
            t7 = "x";
   
            } else if (event.target.dataset.index === "t8") {
            t8 = "x";
            }  currentPlayer = 'player2';
        } else if (currentPlayer === 'player2') { 
            event.target.innerText = "O";
            playCount++;                 
            if (event.target.dataset.index === "t0") {
            t0 = "o";

            } else if (event.target.dataset.index === "t1") {
            t1 = "o";

            } else if (event.target.dataset.index === "t2") {
            t2 = "o"; 

            } else if (event.target.dataset.index === "t3") {
            t3 = "o";

            } else if (event.target.dataset.index === "t4") {
            t4 = "o";
      
            } else if (event.target.dataset.index === "t5") {
            t5 = "o";
         
            } else if (event.target.dataset.index === "t6") {
            t6 = "o";
        
            } else if (event.target.dataset.index === "t7") {
            t7 = "o";
   
            } else if (event.target.dataset.index === "t8") {
            t8 = "o";
 
            } currentPlayer = 'player1';
        } 
    } compareResults();
}


function compareResults() {
    if (playCount === 9) { 
        itsADraw();
    } else if (t0 == "x" && t1 == "x" && t2 == "x") {
        xWins();
    } else if (t3 == "x" && t4 == "x" && t5 == "x") {
        xWins();
    } else if (t6 == "x" && t7 == "x" && t8 == "x") {
        xWins();
    }  else if (t3 == "x" && t0 == "x" && t6 == "x") {
        xWins();
    } else if (t1 == "x" && t4 == "x" && t7 == "x") {
        xWins();
    }  else if (t2 == "x" && t5 == "x" && t8 == "x") {
        xWins();
    } else if (t0 == "x" && t4 == "x" && t8 == "x") {
        xWins();
    } else if (t6 == "x" && t4 == "x" && t2 == "x") {
        xWins();
    } else if (t0 == "o" && t1 == "o" && t2 == "o") {
        oWins();
    } else if (t3 == "o" && t4 == "o" && t5 == "o") {
        oWins();
    } else if (t6 == "o" && t7 == "o" && t8 == "o") {
        oWins();
    }  else if (t3 == "o" && t0 == "o" && t6 == "o") {
        oWins();
    } else if (t1 == "o" && t4 == "o" && t7 == "o") {
        oWins();
    }  else if (t2 == "o" && t5 == "o" && t8 == "o") {
        oWins();
    } else if (t0 == "o" && t4 == "o" && t8 == "o") {
        oWins();
    } else if (t6 == "o" && t4 == "o" && t2 == "o") {
        oWins();
    }    
}

function itsADraw() {
    gameInfo.textContent = 'draw'
    gameStatus = false;
}

function xWins() {
    gameInfo.textContent = 'X wins'
    gameStatus = false;
}

function oWins() {
    gameInfo.textContent = 'O wins'
    gameStatus = false;
}

function resetAll() {
    gameStatus = true;
    t1 = "";
    t0 = "";
    t2 = "";
    t3 = "";
    t4 = "";
    t5 = "";
    t6 = "";
    t7 = "";
    t8 = "";
    gameInfo.textContent = "";
    playCount = 0;
    for (let i = 0; i < boardTile.length; i++) {
        boardTile[i].textContent = "";
        boardTile[i].classList.remove('selected')
    }
}
 

// event listeners

for (let i = 0; i < boardTile.length; i++) {
    boardTile[i].addEventListener('click', handleTileClick)
}

resetBtn.addEventListener('click', resetAll);

/*

let playerData = {
    player1: {
        choices: [];
    },
    player2: {
        choices: [];
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [3, 0, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]


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
    playerData[currentPlayer].choices.push(Number(gridChoice));
    console.log(playerData[currentPlayer].choices);
    playCount++;
    comparePlayerArray();
}


abandoned mega nested loops
function comparePlayerArray() {
    debugger
    for (let i = 0; i < winningCombos.length; i++) {
        for (let j = 0; j < winningCombos[i].length; i++) {
            for (let k=0; k < playerData[currentPlayer].choices.length; k++) {
                if (playerData[currentPlayer].choices[k] !== playerData[currentPlayer].choices[k]) {
                   
                } 
            } 
        }
    } 
}
*/
