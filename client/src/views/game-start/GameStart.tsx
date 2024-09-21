import { Link } from "react-router-dom";

import { type FC } from "react";

type GameStartProps = {
  onSelectLevel: (level: string) => void;
};

const GameStart: FC<GameStartProps> = ({ onSelectLevel }) => {
  return (
    <>
      <h1>Let's Play Hangman!</h1>
      <h2>Level</h2>
      <Link to={"/board"}>
        <button onClick={() => onSelectLevel("Easy")}>Easy</button>
      </Link>
      <Link to={"/board"}>
        <button onClick={() => onSelectLevel("Medium")}>Medium</button>
      </Link>
      <Link to={"/board"}>
        <button onClick={() => onSelectLevel("Difficult")}>Dufficult</button>
      </Link>
    </>
  );
};

export default GameStart;
