import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import  GameContextProvider from './context/game-context/GameContext.tsx';
import GameStart from "./views/game-start/GameStart.tsx";
import Board from "./views/board/Board.tsx";


import "./App.css";

function App() {
  
  return (
    <GameContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GameStart/>} />
          <Route path="/board" element={<Board/>}/>
        </Routes>
      </Router>
    </GameContextProvider>
  );
}

export default App;
