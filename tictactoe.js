/* Handles all the visual functions as well as call board-functions.
'X' is maximiser and 'O' is minimizer
*/



var board = new Board(),
    won = false,
    pPiece, cPiece, cIsMax;  //piece to get from user //left as of now

//Assigning pPiece and cPiece for now. Get from user later.
pPiece = 'X';
cPiece = 'O';

cIsMax = (cPiece === 'X') ? true : false;

$(".square").click(function() {
  var row = parseInt(this.id.slice(-2, -1)),   //slice the second last char which represents row
      col = parseInt(this.id.slice(-1))
      isEmpty;

  if(board.position[row][col] !== null) 
    return;

  if (!won) {
    board.move(row,col,pPiece,false);   //false reps a non-pseudo move
    var boardScore = board.evaluate();
    if(boardScore === 10 || boardScore === -10){    //check for both 10 and -10 because player can be max or min
      alert('Player Won');
      won = true;
      return;
    }
    
    if (board.remainingMoves === 0){
      alert('Draw');
      return;
    }
    
    //calculating bestmove for comp
    var bestMove = findBestMove(board, 9-board.remainingMoves, cIsMax);
    
    board.move(bestMove.row, bestMove.col, cPiece, false);
    boardScore = board.evaluate();
    if(boardScore === 10 || boardScore === -10){    //check for both 10 and -10 because comp can be max or min
      alert('Comp Won');
      won = true;
      return;
    }
    console.log(sqPlayed);
   
  }
});


//much to do