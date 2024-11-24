import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Game2.css";

const COLORS = ["red", "blue", "green", "yellow", "orange", "purple", "pink"];

function Game2() {
  const [currentColor, setCurrentColor] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateRandomColor();
  }, []);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setGameOver(true);
      toast.error("Waktu habis! Game Over!");
    }
  }, [timer, gameOver]);

  const generateRandomColor = () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setCurrentColor(randomColor);
    setUserGuess("");
    setTimer(20);
  };

  const handleGuess = () => {
    if (userGuess.toLowerCase() === currentColor) {
      toast.success("Tebakan Benar! 🎉");
      setScore(score + 1);
      generateRandomColor();
    } else {
      toast.error("Tebakan Salah! 😢 Coba lagi.");
    }
  };
  const handleRetry = () => {
    setScore(0);
    setGameOver(false);
    generateRandomColor();
    toast.info("Game dimulai kembali! Selamat bermain! 😊");
  };

  return (
    <div className="guess-container">
      <h2 className="game-title">Tebak Warna 🎨</h2>
      <p className="game-instruction">
        Tebak nama warna dari kotak di bawah. Kamu punya waktu 20 detik per warna!
      </p>
      <div className="input-section">
        {gameOver ? (
          <div className="game-over-section">
            <h3 className="game-over-text">Game Over! 🎮</h3>
            <p className="final-score">Skor Akhir: {score}</p>
            <button onClick={handleRetry} className="retry-button">
              Coba Lagi 🔄
            </button>
          </div>
        ) : (
          <div className="game-section">
            <div
              className="color-box"
              style={{ backgroundColor: currentColor }}
            ></div>
            <div className="timer-container">
                <p className="timer">Waktu Tersisa: {timer} detik</p>
            </div>
            <input
              type="text"
              placeholder="Masukkan nama warna"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              className="color-input"
            />
            <button onClick={handleGuess} className="submitt-button">
              Tebak Warna
            </button>
            <p className="score">Skor: {score}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game2;
