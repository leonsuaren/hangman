import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GameStart from "./views/game-start/GameStart.tsx";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GameStart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
