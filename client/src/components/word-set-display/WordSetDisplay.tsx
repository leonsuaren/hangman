import { useEffect, useState, useContext, type FC } from "react";

import { GameContext } from "../../context/game-context/GameContext.tsx";
import useCreateEmptyArray from "../../utils/useCreateEmptyArray.ts";

type WordSetDisplayProps = {
  letter: string;
  word: string;
  letterSet: string[]
};

const WordSetDisplay: FC<WordSetDisplayProps> = ({ letter, word, letterSet }) => {
  const gameContext = useContext(GameContext);
  //create an empty array
  const playedWord = gameContext.playedWord;
  const playedWordLength = playedWord.length;
  const wordSet = [...playedWord];
  let newWordSetArray = useCreateEmptyArray(playedWordLength);
  //create an empty array
  const [newWordSet, setNewWordSet] = useState<string[]>(newWordSetArray);
  let wordSetHolder: string[] = newWordSetArray;

  useEffect(() => {
    if (playedWord === word) {
      wordSetHolder = wordSet;
    }
    wordSet.forEach((el, index) => {
      if (el === letter) {
        newWordSet[index] = letter;
      }
    });
    setNewWordSet(newWordSet);
  }, [letter, word]);

  console.log("Word Display", {
    letter: letter,
    playedWord: playedWord,
    word: word,
    newWordSet: newWordSet,
    wordSetHolder: wordSetHolder,
    letterSet: letterSet
  });
  return (
    <div className="word-set-wrapper">
      <div className="word-set-letter">
        {newWordSet.map((letter, key) => (
          <div key={key} className="word-letter">
            {letter}
          </div>
        ))}
      </div>
      <div className="word-base-letter">
        {newWordSetArray.map((word, key) => (
          <div key={key} className="word-base">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordSetDisplay;
