/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  board[x][y].revealed = true;
  newNonMinesCount--;

  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

  if (board[x][y].value === 0) {
    //(x-1,y-1) (x-1,y) (x-1,y+1)
    //(x  ,y-1)         (x  ,y+1)
    //(x+1,y-1) (x+1,y) (x+1,y+1)
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i !== x || j !== y) {
          if (i >= 0 && i < board.length && j >= 0 && j < board.length) {
            console.log(i, j, board[i][j].value);
            if (board[i][j].value === 0 && !board[i][j].revealed && !board[i][j].flagged) {
              revealed(board, i, j, newNonMinesCount);
            } else if (board[i][j].value !== 0 && !board[i][j].revealed && !board[i][j].flagged) {
              board[i][j].revealed = true;
            }
          }
        }
      }
    }

    return { board, newNonMinesCount };
  }
};
