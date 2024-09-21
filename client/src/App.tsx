import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";

import GameStart from "./views/game-start/GameStart.tsx";
import Board from "./views/board/Board.tsx";

import "./App.css";

function App() {
  const [ level, setLevel ] = useState<string>('');

  const handleOnSelectLevel = (level: string) => {
    setLevel(level);
  }
  console.log(level);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GameStart onSelectLevel={handleOnSelectLevel}/>} />
          <Route path="/board" element={<Board />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
