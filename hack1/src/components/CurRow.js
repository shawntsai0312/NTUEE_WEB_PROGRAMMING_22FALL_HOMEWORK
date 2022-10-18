/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div className='Row-wordbox' id={toString(rowIdx) + "_0"} key={toString(rowIdx) + "_0"}>{curGuess[0]}</div>
                <div className='Row-wordbox' id={toString(rowIdx) + "_1"} key={toString(rowIdx) + "_1"}>{curGuess[1]}</div>
                <div className='Row-wordbox' id={toString(rowIdx) + "_2"} key={toString(rowIdx) + "_2"}>{curGuess[2]}</div>
                <div className='Row-wordbox' id={toString(rowIdx) + "_3"} key={toString(rowIdx) + "_3"}>{curGuess[3]}</div>
                <div className='Row-wordbox' id={toString(rowIdx) + "_4"} key={toString(rowIdx) + "_4"}>{curGuess[4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
