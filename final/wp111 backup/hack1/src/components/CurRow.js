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
    console.log(letters);
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div className={letters[0] === undefined ? 'Row-wordbox' : 'Row-wordbox filled'} id={rowIdx.toString() + "-0"} key={rowIdx.toString() + "-0"}>{letters[0]}</div>
                <div className={letters[1] === undefined ? 'Row-wordbox' : 'Row-wordbox filled'} id={rowIdx.toString() + "-1"} key={rowIdx.toString() + "-1"}>{letters[1]}</div>
                <div className={letters[2] === undefined ? 'Row-wordbox' : 'Row-wordbox filled'} id={rowIdx.toString() + "-2"} key={rowIdx.toString() + "-2"}>{letters[2]}</div>
                <div className={letters[3] === undefined ? 'Row-wordbox' : 'Row-wordbox filled'} id={rowIdx.toString() + "-3"} key={rowIdx.toString() + "-3"}>{letters[3]}</div>
                <div className={letters[4] === undefined ? 'Row-wordbox' : 'Row-wordbox filled'} id={rowIdx.toString() + "-4"} key={rowIdx.toString() + "-4"}>{letters[4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
