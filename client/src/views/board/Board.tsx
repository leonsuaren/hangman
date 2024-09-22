import { type FC } from "react";

type BoardProps = {
  level: string;
  playedWord: string;
};

const Board: FC<BoardProps> = ({ level, playedWord }) => {
  console.log(playedWord);

  return (
    <>
      <h1>Hangman</h1>
      <h2>Level {level}</h2>
    </>
  );
};

export default Board;
