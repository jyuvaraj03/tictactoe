var board = new Board(),
    won = false,
    piece, isMax;  //piece to get from user //left as of now

$(".square").click(function() {
  var row = parseInt(this.id.slice(-2, -1)),   //slice the second last char which represents row
      col = parseInt(this.id.slice(-1))
      isEmpty;

  if(board.position[row][col] !== null) 
    return;

  if (!won) {
    board.move(row,col,piece,false);   //false reps a non-pseudo move
    if(evaluate(xRow, xCol, sqPlayed, 'x')==10){
      alert('Player Won');
      won = true;
      return;
    }
    
    if (sqRem.length === 0)
      alert('Draw');
    
    var oPos = sqRem[Math.floor(Math.random()*sqRem.length)],
        oRow = parseInt(oPos.slice(-2,-1)), 
        oCol = parseInt(oPos.slice(-1));
    sqRem.splice(sqRem.indexOf(oPos), 1);
    sqPlayed[oRow][oCol] = 'o';
    $(oPos).text('O');
    if(evaluate(oRow, oCol, sqPlayed, 'o')==-10){
      alert('Comp Won');
      won = true;
    }
    console.log(sqPlayed);
    
  }
});


//much to do