/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setNonMineCount(boardSize * boardSize - mineNum);
        setRemainFlagNum(mineNum);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

        if (!board[x][y].revealed) {
            if (!newBoard[x][y].flagged && remainFlagNum > 0) {
                newFlagNum--;
                newBoard[x][y].flagged = !newBoard[x][y].flagged;
            } else if (newBoard[x][y].flagged) {
                newFlagNum++;
                newBoard[x][y].flagged = !newBoard[x][y].flagged;
            }
            setBoard(newBoard);
            setRemainFlagNum(newFlagNum);
        }
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged || win) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

        revealed(newBoard, x, y, nonMineCount);
        setBoard(newBoard);

        if (board[x][y].value === '💣') {
            //game over then show all non-flagged bombs
            setGameOver(true);
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j].value === '💣' && !board[i][j].flagged) {
                        newBoard[i][j].revealed = true;
                    }
                }
            }
            setBoard(newBoard);
            console.log("lose");
        } else {
            let winTest = true;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j].value !== '💣') {
                        winTest = winTest & newBoard[i][j].revealed;
                    }
                }
            }
            if (winTest) {
                console.log("win");
                setWin(true);
                setGameOver(true);
            }
        }
    };

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}

                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className='boardContainer'>
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
                    {
                        board.map((x, xIndex) => {
                            let idname = "row" + toString(x);
                            return (
                                <div id={idname} style={{ display: 'flex' }}>
                                    {
                                        x.map((y, yIndex) => {
                                            // console.log(xIndex,yIndex,board[xIndex][yIndex].value);
                                            return (
                                                <Cell rowIdx={xIndex} colIdx={yIndex} detail={board[xIndex][yIndex]} updateFlag={updateFlag} revealCell={revealCell} />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            {
                gameOver | win ? <Modal restartGame={restartGame} backToHome={backToHome} win={win} /> : <></>
            }
        </div>
    );



}

export default Board