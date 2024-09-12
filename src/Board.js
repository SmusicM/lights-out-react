import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = []
    // TODO: create array-of-arrays of true/false values
    for(let i=0;i<nrows;i++){
      //empty arr for each row
      let row = []
      for(let j=0;j<ncols;j++){
        //pushes new arr ofcells for row with random gen to get true or false from this statement
        row.push(Math.random()<chanceLightStartsOn)
      }
      //pushes row arr onto board
      initialBoard.push(row)
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for(let row of board){
      //if cell is true aka the ligth is on than return false,my using some on the arr we can see if cell is true
     for(let cell of row){
      if(cell===true){
        return false;
      }
     }
    }
    //return WIN to true if 
    console.log("all ligths turned off")
    return true
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      
      // TODO: Make a (deep) copy of the oldBoard
      //makes deep copy of board and maps by each row by spreading into an array of arrays
      const boardCopy = oldBoard.map(row=>[...row])
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy)
      flipCell(y-1,x,boardCopy)
      flipCell(y+1,x,boardCopy)
      flipCell(y,x-1,boardCopy)
      flipCell(y,x+1,boardCopy)
      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return(
      <div className="Winning">
        <h3 className="Winning-text">YOU WON</h3>
      </div>
    )
  }

  //if(hasWon()){
  //  console.log("all ligths off u won")
  //}
  // TODO

  // make table board

  // TODO
  //maps each row from board making each tr and inside that maps the cell and uses the Cell component and calls flipcellsaround which flipcellsaroundme's onclick target function
  return (
    <div className="Board">
      <table>
      <tbody>
       {board.map((row,rowidx)=>(
          <tr key={rowidx}className="Board-row">
            {row.map((cell,cellidx)=>(
              //with - because flipcellsaround splits -
              <Cell key={`${rowidx}-${cellidx}`} isLit={cell} flipCellsAroundMe={()=>flipCellsAround(`${rowidx}-${cellidx}`)}/>
            ))}
          </tr>
       ))}
       </tbody>
         </table>
    </div>
  )
}

export default Board;
