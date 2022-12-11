"use strict";

// brings in the assert module for unit testing
const assert = require("assert");
// brings in the readline module to access the command line
const readline = require("readline");
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let playBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = "X";

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log("   0  1  2");
  console.log("0 " + playBoard[0].join(" | "));
  console.log("  ---------");
  console.log("1 " + playBoard[1].join(" | "));
  console.log("  ---------");
  console.log("2 " + playBoard[2].join(" | "));
};

// Changes "X" to "O" in the "currentMarker" variable or "O" to "X"
const changeMarker = () => {
  if (playerTurn === "X") {
    playerTurn = "O";
  } else {
    playerTurn = "X";
  }
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

// Checks board after every interaction for win-state
const checkForWin = () => {
  console.log(playBoard);
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    return true;
  } else {
    changeMarker();
  }
};

const ticTacToe = (row, column) => {
  playBoard[row][column] = playerTurn;
  checkForWin();
};

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question("row: ", (row) => {
    rl.question("column: ", (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
};

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === "function") {
  describe("#ticTacToe()", () => {
    it("should place mark on the board", () => {
      ticTacToe(1, 1);
      assert.deepEqual(playBoard, [
        [" ", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "],
      ]);
    });
    it("should alternate between players", () => {
      ticTacToe(0, 0);
      assert.deepEqual(playBoard, [
        ["O", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "],
      ]);
    });
    it("should check for vertical wins", () => {
      playBoard = [
        [" ", "X", " "],
        [" ", "X", " "],
        [" ", "X", " "],
      ];
      assert.equal(verticalWin(), true);
    });
    it("should check for horizontal wins", () => {
      playBoard = [
        ["X", "X", "X"],
        [" ", " ", " "],
        [" ", " ", " "],
      ];
      assert.equal(horizontalWin(), true);
    });
    it("should check for diagonal wins", () => {
      playBoard = [
        ["X", " ", " "],
        [" ", "X", " "],
        [" ", " ", "X"],
      ];
      assert.equal(diagonalWin(), true);
    });
    it("should detect a win", () => {
      ticTacToe(0, 0);
      ticTacToe(0, 1);
      ticTacToe(1, 1);
      ticTacToe(0, 2);
      ticTacToe(2, 2);
      assert.equal(checkForWin(), true);
    });
  });
} else {
  getPrompt();
}
