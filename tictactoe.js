var sqRem = [];
//creating arr of squares remaining
for (var i = 0; i < 3; i++) 
  for (var j = 0; j < 3; j++)
    sqRem.push('#sq' + i + j);

var sqPlayed = [];
for(var i = 0; i < 3; i++){
  sqPlayed.push([null,null,null]);
}


console.log(sqPlayed);
  
console.log(sqRem);

// var playerPos = [];
// var compPos = [];
var won = false;
$(".square").click(function() {
  if (sqRem.includes('#' + this.id) && !won) {
    var xPos = '#' + this.id,
        xRow = parseInt(xPos.slice(-2,-1)), 
        xCol = parseInt(xPos.slice(-1));
    $(this).text('X');
    sqRem.splice(sqRem.indexOf(xPos), 1);
    sqPlayed[xRow][xCol] = 'x';
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

function evaluate(moveRow, moveCol, sqPlayed, piece) {
  //check row
  //var count = 0;
  for(var i = 0; i < 3; i++){
    if (sqPlayed[moveRow][i] !== piece)
      break;
    if (i == 2)
      return piece==='x'? 10 : -10;
  }
  //check col
  for(var i = 0; i < 3; i++){
    if (sqPlayed[i][moveCol] !== piece)
      break;
    if (i == 2)
      return piece==='x'? 10: -10;
  }
  //check diag
  for(var i = 0; i < 3; i++) {
    if (sqPlayed[i][i] !== piece)
      break;
    if (i==2)
      return piece==='x'? 10: -10;
  }
  //check anti-diag
  for(var i = 0; i < 3; i++) {
    if (sqPlayed[i][2-i] !== piece) 
      break;
    if (i == 2)
      return piece==='x'? 10: -10;
  }
  return 0;
}
function evaluate1(board) {
  //if isMax 'x' else 'o'
  //check row
  //var count = 0;
  for(let i = 0; i < 3; i++){
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2])
      if (board[i][0] !== null)
        return (board[i][0] === 'x'? 10: -10);
  }
  //check col
  for(var i = 0; i < 3; i++){
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i])
      if (board[0][i] !== null)
        return board[0][i] === 'x'? 10: -10;
  }
  //check diag
  if (board[0][0] === board[1][1] && board [1][1] === board[2][2])
    if (board[0][0] !== null) 
      return board[0][0] === 'x'? 10: -10;
  //check anti-diag
  if (board[0][2] === board[1][1] && board [1][1] === board[2][0])
    if (board[0][2] !== null) 
      return board[0][2] === 'x'? 10: -10;
  //when no win return 0
  return 0;
}
