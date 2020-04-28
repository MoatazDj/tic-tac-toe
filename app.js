
/**************All variables ***********/

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
let circleTurn;
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winning = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningMessage = document.querySelector('[data-winning-message-text]')
const winningMessagediv = document.getElementById('winningMessage')
const restartButton = document.getElementById('RestartButton1')
const restartButton1 = document.getElementById('RestartButton2')


var player1Score = 0;
var player2Score = 0
var player1Score_span = document.getElementById("player1-score")
var player2Score_span = document.getElementById("player2-score")


/*********************Helper functions ******************/

var win1 = function() {
    player1Score++;
    player1Score_span.innerHTML = player1Score;
    player2Score_span.innerHTML = player2Score;
  }
  
  var win2 = function() {
    player2Score++;
    player1Score_span.innerHTML = player1Score;
    player2Score_span.innerHTML = player2Score;
  }
  
  var draw = function() {
    player1Score_span.innerHTML = player1Score;
    player2Score_span.innerHTML = player2Score;
  }

  function endGame(dr) {
    if (dr) {
        winningMessage.innerText = "Draw!"
    }
    else if (circleTurn) {
        winningMessage.innerText = "player2 Wins!"
        win2()
    }
    else if (!circleTurn) {
        winningMessage.innerText =  "player1Wins!"
        win1()
    }
    winningMessagediv.classList.add('show')
    draw()
}

function restart() {
    player1Score_span.innerHTML = 0
    player2Score_span.innerHTML = 0
    player1Score = 0
    player2Score = 0
}




function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function PlaceMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn
}

function setBoarHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return winning.some(one =>{
        return one.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

/***************************Event functions *****************************/

function startGame() {
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click',handleClick, {once: true})
    })
    setBoarHoverClass()
    winningMessagediv.classList.remove('show')
}

startGame()



function handleClick(wassap) {
    const cell = wassap.target 
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    PlaceMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else{
        swapTurn()
        setBoarHoverClass()
    }
}

restartButton.addEventListener('click', startGame)
restartButton1.addEventListener('click', restart)

