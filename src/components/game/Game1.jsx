import React, { useState } from "react";
import "./Game1.css";
import { ToastContainer, toast } from "react-toastify";
import { FaRedo } from "react-icons/fa"; 

function Game1() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [inputNumber, setInputNumber] = useState("");
  const [chances, setChances] = useState(4);
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState([true, true, true, true]);
  const [errorType, setErrorType] = useState(""); 
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    const guessedNumber = parseInt(inputNumber);

    if (guessedNumber === targetNumber) {
      toast.success("🎉 Tebakanmu benar!", {
        position: "top-right",
        theme: "dark",
      });
      setTimeout(() => {
        handleRetry();
      }, 500);
      return;
    }

    if (chances === 1) {
      toast.error("Gagal menebak angka!", {
        position: "top-right",
        theme: "dark",
      });
      setChances(0);
      setGameOver(true);
      setLives([false, false, false, false]);
      return;
    }

    if (!inputNumber || guessedNumber < 1 || guessedNumber > 10) {
      toast.warn("Masukkan angka antara 1 dan 10", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }

    if (guessedNumber < targetNumber) {
      setMessage("Terlalu rendah!");
      setErrorType("low");
    } else {
      setMessage("Terlalu tinggi!");
      setErrorType("high");
    }

    setChances(chances - 1);

    const newLives = [...lives];
    newLives[4 - chances] = false;
    setLives(newLives);

    setInputNumber(""); 
  };

  const handleRetry = () => {
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
    setChances(4);
    setLives([true, true, true, true]);
    setMessage("");
    setErrorType("");
    setInputNumber("");
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2 className="game-title">Tebak Angka</h2>
        <p className="game-subtitle">Tebak angka dari 1 sampai 10 dalam 4 kesempatan.</p>
      </div>
      <div className="input-section">
        <h4 className="game-tebak">Masukkan Angka</h4>
        <div className="game-lives">
          {lives.map((life, index) => (
            <div
              key={index}
              className={`game-life ${life ? "alive" : "dead"}`}
            ></div>
          ))}
        </div>
        <div className="input-group">
          <input
            id="guess-input"
            type="number"
            min="1"
            max="10"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="1-10"
            className="customm-input"
          />
        </div>
        <div className="button-container">
          <button
            onClick={gameOver ? handleRetry : handleGuess}
            className={`submit-button ${gameOver ? "retry" : ""}`}
            disabled={gameOver && chances !== 0} 
          >
            {gameOver ? (
              <><FaRedo/> Coba Lagi</>
            ) : (
              "Tebak Angka"
            )}
          </button>
        </div>
        <div className={`error-message ${errorType}`}>
          {message && (
            <>
              <span>{errorType === "high" ? "⬆" : "⬇"}</span>
              {message}
            </>
          )}
        </div>
        <p className="status-message">Kesempatan tersisa: {chances}</p>
      </div>
    </div>
  );
}

export default Game1;
