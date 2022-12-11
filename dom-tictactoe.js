//       ***********************
//            INSTRUCTIONS
//       ***********************

// 1. Read the code below and figure out the data flow
// 2. Add in your code from the terminal app (check for win logic)
// 3. Look for the @TODO, to fix
// next to each @TODO you will find tasks that need to be finished
// 4. GET THIS GAME WORKING!!

let playBoard = [
  ["", "", ""], // <-- Row 1, index 0
  ["", "", ""], // <-- Row 2, index 1
  ["", "", ""], // <-- Row 3, index 2
];
console.log(playBoard);

let currentMarker = "X";

// Verifies box is not already in use
const handleClick = (element) => {
  console.log(`The element you clicked on has an id:  ${element.id}`);
  if (!document.getElementById(element.id).innerHTML) {
    addMarker(element.id);
  }
};

// Places the "currentMarker" inside the HTML element that was clicked
const addMarker = (id) => {
  console.log(`"${currentMarker}"  placed in square:  ${id}`);
  let element = document.getElementById(id);
  element.innerHTML = currentMarker;
  const row = parseInt(element.id.charAt(0));
  const column = parseInt(element.id.charAt(2));
  playBoard[row][column] = currentMarker;
  console.log(playBoard);
  checkForWin();
};

// Changes "X" to "O" in the "currentMarker" variable or "O" to "X"
const changeMarker = () => {
  if (currentMarker === "X") {
    currentMarker = "O";
    document.getElementById("interact").innerHTML =
      "It's " + currentMarker + "'s turn.";
  } else {
    currentMarker = "X";
    document.getElementById("interact").innerHTML =
      "It's " + currentMarker + "'s turn.";
  }
};

// Checks board after every interaction for win-state
const checkForWin = () => {
  console.log(playBoard);
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    setTimeout(() => {
      winnerWinner();
      resetBoard();
    }, 100);
  } else {
    changeMarker();
  }
};

function winnerWinner() {
  let piece1 = document.getElementById("piece1").innerHTML;
  if (piece1 === currentMarker) {
    window.alert(
      `${
        document.getElementById("player1").innerHTML
      } won playing ${currentMarker}!`
    );
    let winCount = document.getElementById("player1Score").innerHTML;
    let newWinCount = parseInt(winCount) + 1;
    document.getElementById("player1Score").innerHTML = newWinCount;
  } else {
    window.alert(
      `${
        document.getElementById("player2").innerHTML
      } won playing ${currentMarker}!`
    );
    let winCount = document.getElementById("player2Score").innerHTML;
    let newWinCount = parseInt(winCount) + 1;
    document.getElementById("player2Score").innerHTML = newWinCount;
  }
}

function pieceChange() {
  let piece1 = document.getElementById("piece1").innerHTML;
  if (piece1 === "X") {
    document.getElementById("piece1").innerHTML = "O";
    document.getElementById("piece2").innerHTML = "X";
  } else {
    document.getElementById("piece1").innerHTML = "X";
    document.getElementById("piece2").innerHTML = "O";
  }
}

// Resets Board
const resetBoard = () => {
  const squares = document.getElementsByTagName("TD");
  for (i = 0; i < squares.length; i++) {
    squares[i].innerHTML = null;
  }
  playBoard = [
    ["", "", ""], // <-- Row 1, index 0
    ["", "", ""], // <-- Row 2, index 1
    ["", "", ""], // <-- Row 3, index 2
  ];
  document.getElementById("interact").innerHTML = "Get ready to play!";
  currentMarker = "X";
  pieceChange();
};

// resets win count
const winChartReset = () => {
  document.getElementById("player1Score").innerHTML = 0;
  document.getElementById("player2Score").innerHTML = 0;
};

//Win-states
const horizontalWin = () => {
  if (
    (playBoard[0][0] == "X" &&
      playBoard[0][1] == "X" &&
      playBoard[0][2] == "X") ||
    (playBoard[0][0] == "O" &&
      playBoard[0][1] == "O" &&
      playBoard[0][2] == "O") ||
    (playBoard[1][0] == "X" &&
      playBoard[1][1] == "X" &&
      playBoard[1][2] == "X") ||
    (playBoard[1][0] == "O" &&
      playBoard[1][1] == "O" &&
      playBoard[1][2] == "O") ||
    (playBoard[2][0] == "X" &&
      playBoard[2][1] == "X" &&
      playBoard[2][2] == "X") ||
    (playBoard[2][0] == "O" && playBoard[2][1] == "O" && playBoard[2][2] == "O")
  ) {
    return true;
  } else {
    return false;
  }
};

const verticalWin = () => {
  if (
    (playBoard[0][0] == "X" &&
      playBoard[1][0] == "X" &&
      playBoard[2][0] == "X") ||
    (playBoard[0][0] == "O" &&
      playBoard[1][0] == "O" &&
      playBoard[2][0] == "O") ||
    (playBoard[0][1] == "X" &&
      playBoard[1][1] == "X" &&
      playBoard[2][1] == "X") ||
    (playBoard[0][1] == "O" &&
      playBoard[1][1] == "O" &&
      playBoard[2][1] == "O") ||
    (playBoard[0][2] == "X" &&
      playBoard[1][2] == "X" &&
      playBoard[2][2] == "X") ||
    (playBoard[0][2] == "O" && playBoard[1][2] == "O" && playBoard[2][2] == "O")
  ) {
    return true;
  } else {
    return false;
  }
};

const diagonalWin = () => {
  if (
    (playBoard[0][0] == "X" &&
      playBoard[1][1] == "X" &&
      playBoard[2][2] == "X") ||
    (playBoard[0][0] == "O" &&
      playBoard[1][1] == "O" &&
      playBoard[2][2] == "O") ||
    (playBoard[2][0] == "X" &&
      playBoard[1][1] == "X" &&
      playBoard[0][2] == "X") ||
    (playBoard[2][0] == "O" && playBoard[1][1] == "O" && playBoard[0][2] == "O")
  ) {
    return true;
  } else {
    return false;
  }
};

function players1() {
  document.getElementById("player1").innerHTML =
    document.getElementById("name1").value;
}
function players2() {
  document.getElementById("player2").innerHTML =
    document.getElementById("name2").value;
}

// @TODO, Your code here: make sure to reset the array of arrays to empty for a new game

// **BONUSES**

// 1. 👍Display the current player's turn
// 2. 👍Count number of wins for each player and display them
// 3. 👍Reset the number of wins
// 4. 👍Clear the board on alert window dismissal
// 5. 👍Add players names and display who wins, i.e. "Congrats Emily, you won with 0s!"
