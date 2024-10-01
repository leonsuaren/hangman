import { type FC, useContext } from 'react';
import { Link } from "react-router-dom";

import { GameContext } from '../../context/game-context/GameContext';

const GameStart: FC = () => {
  const gameContext = useContext(GameContext);
  return (
    <>
      <h1>Let's Play Hangman!</h1>
      <h3>Level</h3>
      <Link to={"/board"}>
        <button onClick={() => gameContext.handleOnSelectLevel("Easy")}><span>Easy</span></button>
      </Link>
      <Link to={"/board"}>
        <button onClick={() => gameContext.handleOnSelectLevel("Medium")}><span>Medium</span></button>
      </Link>
      <Link to={"/board"}>
        <button onClick={() => gameContext.handleOnSelectLevel("Difficult")}><span>Difficult</span></button>
      </Link>
    </>
  );
};

export default GameStart;
