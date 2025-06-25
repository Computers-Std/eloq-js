const size = 8;

function isEven(n) {
  return n % 2 == 0;
}

function chessBoard() {
  let blocks = " ";
  for (let i = 1; i <= size; i++) {
    // Determine whether to start with a space or hash
    let forEven = isEven(i) ? " " : "#";
    let forOdd = isEven(i) ? "#" : " ";

    for (let j = 1; j <= size; j++) {
      // Add the correct block (either space or hash) for each column
      isEven(j) ? (blocks += forEven) : (blocks += forOdd);
    }
    blocks += "\n";
  }
  console.log(blocks);
}

// With Hints
function chessBoard2() {
  let blocks = " ";
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      isEven(i + j) ? (blocks += " ") : (blocks += "#");
    }
    blocks += "\n";
  }
  console.log(blocks);
}

chessBoard2();
