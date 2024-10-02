import { useEffect, useState,useContext, type FC } from "react";

import { GameContext } from "../../context/game-context/GameContext.tsx";
import useCreateEmptyArray from "../../utils/useCreateEmptyArray.ts";

type WordSetDisplayProps = {
  letter: string;
};

const WordSetDisplay: FC<WordSetDisplayProps> = ({
  letter,
}) => {
  const gameContext = useContext(GameContext);
  //create an empty array
  const playedWord = gameContext.playedWord;
  const playedWordLength = playedWord.length;
  const wordSet = [...playedWord]
  let newWordSetArray = useCreateEmptyArray(playedWordLength);
  //create an empty array
  
  let givenLetter: string | undefined = letter; //Find a solution
  const [newWordSet, setNewWordSet] = useState<string[]>(newWordSetArray);
  
  useEffect(() => {
    const wordSetHolder: string[] = newWordSetArray;
    wordSet.forEach((el, index) => {
      if (el === letter) {
        wordSetHolder[index] = letter
      }
    })
    setNewWordSet(wordSetHolder);
  }, [givenLetter]);

  // console.log("Word Display" ,{
  //   playedWord: playedWord,
  //   letter: givenLetter,
  //   newWordSet: newWordSet,
  // });
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
