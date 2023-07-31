import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [statusMessage, setStatusMessage] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [socket] = useState(() => io("https://ttcnc.onrender.com/"));

  function handleJoin() {
    socket.emit("join", { name: playerName });
  }

  function handleClick(index) {
    if (!playerSymbol || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    socket.emit("move", { board: newBoard });
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setStatusMessage("");
    setPlayerSymbol(null);
    setOpponentName("");
    socket.emit("reset");
  }

  function renderCell(index) {
    return (
      <button
        className="w-16 h-16 border border-gray-400"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  }

  function renderStatus() {
    return statusMessage;
  }

  socket.on("message", (message) => {
    switch (message.type) {
      case "waiting":
        setStatusMessage("Waiting for another player...");
        break;
      case "game_start":
        setPlayerSymbol(message.symbol);
        setOpponentName(message.opponent);
        setStatusMessage(
          `You are playing as ${message.symbol} against ${message.opponent}`
        );
        break;
      case "board_state":
        setBoard(message.board);
        break;
      case "game_over":
        if (message.winner) {
          setStatusMessage(`Game over. Winner: ${message.winner}`);
        } else {
          setStatusMessage("Game over. It's a draw!");
        }
        break;
      default:
        break;
    }
  });

  if (!playerName) {
    return (
      <div className="flex flex-col justify-center h-screen items-center mt-8">
        <input
          className="mb-4 px-4 py-2 border border-gray-400 rounded"
          placeholder="Enter your name"
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleJoin}
          disabled={!playerName}
        >
          Join
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-screen items-center mt-8">
      <div className="mb-4 text-2xl font-bold">{renderStatus()}</div>
      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <div key={index}>{renderCell(index)}</div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
