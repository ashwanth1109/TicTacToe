//-----GLOBAL STATE-----//
let gameSize = 3;
let computerMoveNumber = 0;
// let movesCompleted = [];
let movesRemaining = [];
let gameOver = false;
for (let i = 0; i < gameSize * gameSize; i++) {
  movesRemaining.push(i.toString());
}
console.log(movesRemaining);

//-----ADD NEW GAME BUTTON FUNCTIONALITY-----//
$(`#new-game`).on(`click`, () => {
  location.reload();
});

//-----GET GAME BOARD-----//
const gameBoard = $(`#game-board`);
//-----GET SCORE BOARD-----//
const message = $(`#message`);

//-----CALCULATE BOARD DIMENSIONS-----//
const boardHeight = parseInt(gameBoard.css(`height`));
const boardWidth = parseInt(gameBoard.css(`width`));
console.log(boardHeight, boardWidth);
const rowHeight = (boardHeight - 5 * (gameSize - 1)) / gameSize;
const squareWidth = (boardWidth - (gameSize - 1) * 5) / gameSize;

//-----CHECK IF GAME IS OVER-----//
const checkIfGameIsOver = didXPlay => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  if (didXPlay) {
    // CHECK WIN CONDITION
    const squares = $(`.game-square`);
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      // console.log(squares.eq(condition[0]).text());
      const item1 = condition[0];
      const item2 = condition[1];
      const item3 = condition[2];
      if (
        squares.eq(item1).text() === `X` &&
        squares.eq(item2).text() === `X` &&
        squares.eq(item3).text() === `X`
      ) {
        message
          .children()
          .eq(0)
          .text(`Game Over`);
        gameOver = true;
        message
          .children()
          .eq(1)
          .text(`Computer has won`);
      }
    }
  } else {
    // CHECK WIN CONDITION
    const squares = $(`.game-square`);
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      // console.log(squares.eq(condition[0]).text());
      const item1 = condition[0];
      const item2 = condition[1];
      const item3 = condition[2];
      if (
        squares.eq(item1).text() === `O` &&
        squares.eq(item2).text() === `O` &&
        squares.eq(item3).text() === `O`
      ) {
        message
          .children()
          .eq(0)
          .text(`Game Over`);
        message
          .children()
          .eq(1)
          .text(`Player has won`);
        gameOver = true;
      }
    }
  }
};

//-----MOVE RANDOMIZER-----//
const moveRandomizer = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//-----CALCULATE WHICH MOVE TO MAKE-----//
const calculateMove = () => {
  //-----GET GAME SQUARES-----//
  const squares = $(`.game-square`);
  const randomMove = moveRandomizer(0, movesRemaining.length - 1);
  squares.eq(movesRemaining[randomMove]).text(`X`);
  movesRemaining.splice(movesRemaining.indexOf(movesRemaining[randomMove]), 1);
  console.log(movesRemaining);
  // movesCompleted.push(moveChoices[randomMove].toString());
  // console.log(movesChoices[randomMove]);
};

//-----COMPUTER STRATEGY-----//
const computerMove = () => {
  // COMPUTER PLAYS FIRST STRATEGY
  // let moveChoices = [];
  // switch (computerMoveNumber) {
  //   case 0:
  //     // COMPUTER SHOULD PLAY CENTER OR CORNER ONLY ON FIRST MOVE
  //     moveChoices = [0, 2, 4, 6, 8];
  //     calculateMove(moveChoices);
  //     break;
  //   case 1:
  //     if (movesCompleted[0] === `4`) {
  //       switch (movesCompleted[1]) {
  //         case `1`:
  //           moveChoices = [6, 8];
  //           calculateMove(moveChoices);
  //           break;
  //         case `3`:
  //           moveChoices = [2, 8];
  //           calculateMove(moveChoices);
  //           break;
  //         case `5`:
  //           moveChoices = [0, 6];
  //           calculateMove(moveChoices);
  //           break;
  //         case `7`:
  //           moveChoices = [0, 2];
  //           calculateMove(moveChoices);
  //           break;
  //         default:
  //           calculateMove(movesRemaining);
  //           break;
  //       }
  //     }
  //     break;
  //   case 2:
  //     break;
  // }

  if (!gameOver) {
    calculateMove();
  }
  checkIfGameIsOver(true);

  computerMoveNumber++;
};

//-----ADD X OR O TO BOARD-----//
// PLAYER TURN
const addXOrO = event => {
  // GET SQUARE TO ADD TO
  const square = $(event.target);
  // SQUARE SHOULD NOT HAVE ANY CONTENT
  if (square.text() === `` && !gameOver) {
    square.text(`O`);
    movesRemaining.splice(movesRemaining.indexOf(square.attr(`value`)), 1);
    // console.log(movesRemaining);
  }
  // movesCompleted.push(square.attr(`value`));
  // console.log(movesCompleted);
  // console.log(square.attr(`value`));
  checkIfGameIsOver(false);
  computerMove();
};

//-----GENERATE GAME BOARD WITH ROWS AND SQUARES-----//
const generateBoard = () => {
  let squareCount = 0;
  for (let i = 0; i < gameSize; i++) {
    //-----CREATE ROWS-----//
    const gameRows = $(`<div class="game-row">`)
      .css(`height`, rowHeight)
      .appendTo(gameBoard);

    //-----FOR LOOP TO GENERATE SQUARES-----//
    for (let j = 0; j < gameSize; j++) {
      //-----CREATE SQUARES-----//
      const squares = $(`<div class="game-square" value="" row="" column="">`)
        .css(`height`, rowHeight)
        .css(`width`, squareWidth)
        .attr(`value`, squareCount)
        .attr(`row`, i + 1)
        .attr(`column`, j + 1)
        .appendTo(gameRows)
        .on(`click`, addXOrO);
      squareCount++;
    }
  }
};

generateBoard();
computerMove();
