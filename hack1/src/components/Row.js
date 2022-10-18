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


            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[0].color} id={toString(rowIdx) + "_0"} key={toString(rowIdx) + "_0"}>{guess === undefined ? "" : guess[0].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[1].color} id={toString(rowIdx) + "_1"} key={toString(rowIdx) + "_1"}>{guess === undefined ? "" : guess[1].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[2].color} id={toString(rowIdx) + "_2"} key={toString(rowIdx) + "_2"}>{guess === undefined ? "" : guess[2].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[3].color} id={toString(rowIdx) + "_3"} key={toString(rowIdx) + "_3"}>{guess === undefined ? "" : guess[3].char}</div>
                <div className={guess === undefined ? 'Row-wordbox' : 'Row-wordbox ' + guess[4].color} id={toString(rowIdx) + "_4"} key={toString(rowIdx) + "_4"}>{guess === undefined ? "" : guess[4].char}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;