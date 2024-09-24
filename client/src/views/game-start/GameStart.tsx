import { Link } from "react-router-dom";

import { type FC } from "react";

type GameStartProps = {
  onSelectLevel: (level: 'Easy' | 'Medium' | 'Difficult') => void;
};

const GameStart: FC<GameStartProps> = ({ onSelectLevel }) => {
  return (
    <>
      <h1>Let's Play Hangman!</h1>
      <h2>Level</h2>
      <Link to={"/board"}>
        <button onClick={() => onSelectLevel("Easy")}><span>Easy</span></button>
      </Link>
      <Link to={"/board"}>
        <button onClick={() => onSelectLevel("Medium")}><span>Medium</span></button>
      </Link>
      <Link to={"/board"}>
        <button onClick={() => onSelectLevel("Difficult")}><span>Difficult</span></button>
      </Link>
    </>
  );
};

export default GameStart;
