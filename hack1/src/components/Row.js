/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            {
                // guess.map(
                //     (elem,elemIndex)=>{
                //         
                //         let color = elem.color;
                //         let char = elem.char;

                //         return(
                //             <div className={"Row-wordbox"+color} id={idName} key={idName}>{char}</div>
                //         )
                //     }
                // )
            }


            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[0].color} id={toString(rowIdx) + "_0"} key={toString(rowIdx) + "_0"}>{guess === undefined ? "" : guess[0].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[0].color} key={toString(rowIdx) + "_1"}>{guess === undefined ? "" : guess[1].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[0].color} key={toString(rowIdx) + "_2"}>{guess === undefined ? "" : guess[2].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[0].color} key={toString(rowIdx) + "_3"}>{guess === undefined ? "" : guess[3].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[0].color} key={toString(rowIdx) + "_4"}>{guess === undefined ? "" : guess[4].char}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;