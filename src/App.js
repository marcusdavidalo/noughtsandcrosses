import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const API_BASE_URL = "https://ttcnc.onrender.com/api";
const socket = io(API_BASE_URL);

const App = () => {
  const [board, setBoard] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(""))
  );
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("boardUpdate", ({ board: updatedBoard, currentPlayer }) => {
      console.log("Received board update:", updatedBoard);
      setBoard(updatedBoard);
      setCurrentPlayer(currentPlayer);
    });

    const savedName = localStorage.getItem("playerName");
    if (savedName) {
      setPlayerName(savedName);
    } else {
      const name = prompt("Please enter your name:");
      setPlayerName(name || "");
      localStorage.setItem("playerName", name || "");
    }
  }, []);

  const resetGame = async () => {
    try {
      await axios.post(`${API_BASE_URL}/reset`);
      setBoard(Array(3).fill(Array(3).fill("")));
      setCurrentPlayer("");
      setWinner(null); // Set winner to null
      setMessage("");
    } catch (error) {
      console.error("Error resetting the game", error);
    }
  };

  const makeMove = async (row, col) => {
    try {
      if (board[row][col] === "" && !winner && playerName) {
        const response = await axios.post(`${API_BASE_URL}/move`, { row, col });
        const {
          board: updatedBoard,
          currentPlayer,
          winner,
          message,
        } = response.data;

        if (updatedBoard && Array.isArray(updatedBoard)) {
          setBoard(updatedBoard);
        }

        setCurrentPlayer(currentPlayer);

        if (winner) {
          if (winner === "draw") {
            setMessage(message);
          } else {
            // Update the board state with the winning move
            setBoard(updatedBoard);
            setWinner(winner);
            setMessage(message);
          }
        }

        // Emit the board update with currentPlayer and winner
        socket.emit("boardUpdate", {
          board: updatedBoard,
          currentPlayer,
          winner,
        });
      } else {
        // Emit the board update even if the move is invalid or there is already a winner
        socket.emit("boardUpdate", {
          board,
          currentPlayer,
          winner,
        });
      }
    } catch (error) {
      console.error("Error making the move", error);
    }
  };

  const renderCell = (row, col) => {
    if (!board || !Array.isArray(board[row]) || board[row][col] === undefined) {
      console.log("Invalid board state:", board);
      return null;
    }

    return (
      <div
        key={row * 3 + col}
        className="h-16 w-16 border border-gray-300 flex items-center justify-center text-3xl font-bold cursor-pointer bg-white"
        onClick={() => makeMove(row, col)}
      >
        {board[row][col]}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="flex">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => renderCell(rowIndex, colIndex))
          )}
        </div>
      </div>
      {winner !== null || winner === "draw" ? (
        <div className="mb-4">
          <p className="font-bold">{message}</p>
          {winner !== "draw" ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2"
              onClick={resetGame}
            >
              Play Again
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2"
              onClick={resetGame}
            >
              Play Again
            </button>
          )}
        </div>
      ) : playerName ? (
        <p className="font-bold">{currentPlayer}'s Turn</p>
      ) : null}
    </div>
  );
};

export default App;
