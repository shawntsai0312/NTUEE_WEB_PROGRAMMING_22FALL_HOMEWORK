import React, { useState } from "react";
import { startGame, guess, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleGuess = async () => {
    const response = await guess(number);
    if (response === 'Equal') setHasWon(true);
    else {
      setStatus(response);
      setNumber('');
    }
  }

  const handleInput = (e) =>{
    console.log(e.target.value);
    setNumber(e.target.value);
  }

  const startMenu =
    <div>
      <button onClick={async () => {
        await startGame()
        setHasStarted(true);
        setHasWon(false);
      }
      } > start game </button>
    </div>

  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      <input // Get the value from input
        value={number}
        onChange={handleInput}
      ></input>
      <button // Send number to backend
        onClick={handleGuess}
        disabled={!number}
      >guess!</button>
      <p>{status}</p>
    </>

  const winningMode =
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={async () => {
        await restart()
        setHasStarted(true);
        setHasWon(false);
      }}
      >restart</button>
    </>

  const game =
    <div>
      {hasWon ?
        winningMode : gameMode}
    </div>



  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
