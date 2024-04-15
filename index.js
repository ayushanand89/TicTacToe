const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box) => {
        box.classList.remove("win");
        box.innerText = "";
        box.style.pointerEvents = "auto";
    });
}

initGame();

function swapTurn() {
    if(currentPlayer == "X")
    {
        currentPlayer = "O";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
    else if(currentPlayer == "O") {
        currentPlayer = "X";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
}

function checkGameOver() {
    let winner = false;
    winningPositions.forEach((winningPosition) => {
        if(gameGrid[winningPosition[0]] === gameGrid[winningPosition[1]] && gameGrid[winningPosition[1]] === gameGrid[winningPosition[2]]
             && gameGrid[winningPosition[0]]!== "") {
            winner = true;
            swapTurn();
            gameInfo.innerText = `Winner - ${currentPlayer}`;
            newGameBtn.classList.add("active");
            boxes[winningPosition[0]].classList.add("win");
            boxes[winningPosition[1]].classList.add("win");
            boxes[winningPosition[2]].classList.add("win");

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
        }
    });
    let pointer = 0;
    boxes.forEach((box) => {
        if(box.style.pointerEvents == "none") {
            pointer++;
        }
    });
    console.log(pointer);
    if(pointer == 9) {
        newGameBtn.classList.add("active");
        gameInfo.innerText = "Game Tied!";
    }
}

function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check if game finished
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);
