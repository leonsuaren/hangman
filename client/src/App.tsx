import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import GameStart from "./views/game-start/GameStart.tsx";
import Board from "./views/board/Board.tsx";

import { WordsLevelEasy, WordsLevelMedium, WordsLevelDifficult } from './utils/words.ts';

import "./App.css";

function App() {
  const [ level, setLevel ] = useState<string>('');
  const [ playedWord, setPlayedWord ] = useState<string>('');
  let randomWord: number = Math.floor(Math.random() * 29);

  useEffect(() => {
    if (level === "Easy") {
      setPlayedWord(WordsLevelEasy[randomWord]);
    } else if (level === "Medium") {
      setPlayedWord(WordsLevelMedium[randomWord])
    } else if (level === "Difficult") {
      setPlayedWord(WordsLevelDifficult[randomWord]);
    }
  }, [level]);

  const handleOnSelectLevel = (level: string) => {
    setLevel(level);
  }
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GameStart onSelectLevel={handleOnSelectLevel}/>} />
          <Route path="/board" element={<Board level={level} playedWord={playedWord}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
