function Board() {
  this.position = [];
  for(var i = 0; i < 3; i++)
    this.position.push([null,null,null]);
  this.remainingMoves = 9;
}

Board.prototype.move = function(row, col, piece, isPseudo) {
  //piece is either 'X' or 'O'
  //isPseudo is Bool, true if move is pseudo, false if real move
  //Pseudo move is used while calculating best move

  if(this.position[row][col] === null){
    this.position[row][col] = piece;
    if(!isPseudo)
      $('#sq'+row+col).text(piece);
    this.remainingMoves--;
  }
}

Board.prototype.undo = function(row, col) {
  this.position[row][col] = null;
  this.remainingMoves++;
}

Board.prototype.evaluate = function() {
  for(var i = 0; i < 3; i++){
    if (this.position[i][0] === this.position[i][1] && this.position[i][1] === this.position[i][2])
      if (this.position[i][0] !== null)
        return (this.position[i][0] === 'X'? 10: -10);
  }
  //check col
  for(var i = 0; i < 3; i++){
    if (this.position[0][i] === this.position[1][i] && this.position[1][i] === this.position[2][i])
      if (this.position[0][i] !== null)
        return this.position[0][i] === 'X'? 10: -10;
  }
  //check diag
  if (this.position[0][0] === this.position[1][1] && this.position [1][1] === this.position[2][2])
    if (this.position[0][0] !== null) 
      return this.position[0][0] === 'X'? 10: -10;
  //check anti-diag
  if (this.position[0][2] === this.position[1][1] && this.position [1][1] === this.position[2][0])
    if (this.position[0][2] !== null) 
      return this.position[0][2] === 'X'? 10: -10;
  //when no win return 0
  return 0;
}

function minimax(board, depth, isMax) {
  //console.log("Minimax called", board.position);
  
  var score = board.evaluate();
  if(score === 10 || score === -10){
    //console.log("Last call", score);
    return score;
  }
  
  if(board.remainingMoves===0)
    return 0;
  
  
  if (isMax) {
    var bestVal = -1000;
    for(var i = 0; i < 3; i++){  
      for(var j = 0; j < 3; j++){
        if(board.position[i][j] !== null)  //next iteration if not valid move
          continue; 
        board.move(i, j, 'X', true);
        var value = minimax(board, depth+1, false);
        // console.log(value, board.position);
        bestVal = value > bestVal ? value: bestVal;
        board.undo(i, j);   // undo last move
      }

    }
    if (bestVal === 10)
      return bestVal - depth;
    else
      return bestVal;    
  }
  else {
    var bestVal = +1000;
    for(var i = 0; i < 3; i++){  //for every move in board
      for(var j = 0; j < 3; j++){
        if(board.position[i][j] !== null)   //next iteration if not valid move
          continue;

        board.move(i, j, 'O', true); 
        var value = minimax(board, depth+1, true);
         // console.log(value, board.position);
        bestVal = value < bestVal ? value: bestVal;
        board.undo(i, j);   // undo last move
      }
    }
    if (bestVal === -10)
      return bestVal + depth;
    else
      return bestVal;    
  }
}


function findBestMove (board, depth, isMax) {
  //console.log("Printing best move");
  var bestVal,
      bestMoveRow = null,
      bestMoveCol = null;

  bestVal = isMax ? -1000 : 1000;

  for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++) {
      
      if(board.position[i][j] !== null)       //next iteration if not a valid move
        continue;

      if(isMax){

        board.move(i, j, 'X', true);
        var value = minimax(board, depth, false);
        console.log(i, j, value);
        board.undo(i, j);

        if (value > bestVal){
          bestVal = value;
          bestMoveRow = i;
          bestMoveCol = j;
          console.log("Assigning bestMove", bestMoveRow, bestMoveCol);
        }

        console.log(value, bestVal);
      }
      else {
        board.move(i, j, 'O', true);
        var value = minimax(board, depth, true);
        console.log(i, j, value);
        board.undo(i, j);

        if (value < bestVal){
          bestVal = value;
          bestMoveRow = i;
          bestMoveCol = j;
          console.log("Assigning bestMove", bestMoveRow, bestMoveCol);
        }

        console.log(value, bestVal);
      }
    }
  }
  console.log("Best Move Val: ", bestVal);
  console.log("BestMove Row, Col: ", bestMoveRow, bestMoveCol);
  return {
    row: bestMoveRow,
    col: bestMoveCol
  };
}

/*function main(){
  var board = new Board();
  board.position = [["X", 'X', 'O'],
                    ['O', 'O', 'X'],
                    ['X', null, null]];
  board.remainingMoves = 2;
  var depth = 9 - board.remainingMoves;
  var bestMove = findBestMove(board, depth, false);
}

main();
*/

//Do no more changes