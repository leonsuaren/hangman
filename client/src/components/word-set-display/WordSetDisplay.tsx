import { useEffect, useState, type FC } from "react";

import useCreateEmptyArray from "../../utils/useCreateEmptyArray.ts";

type WordSetDisplayProps = {
  playedWord: string[];
  letter: string;
};

const WordSetDisplay: FC<WordSetDisplayProps> = ({
  playedWord,
  letter,
}) => {
  //create an empty array
  let newWordSetArray = useCreateEmptyArray(playedWord.length);
  //create an empty array
  
  let givenLetter: string | undefined = letter; //Find a solution
  const [newWordSet, setNewWordSet] = useState<string[]>(newWordSetArray);
  
  useEffect(() => {
    const wordSetHolder: string[] = newWordSetArray;
    // let letterIndex: number;
    // if (playedWord.indexOf(givenLetter) !== -1) {
    //   letterIndex = playedWord.indexOf(givenLetter);
    //   wordSetHolder.splice(letterIndex, 1, givenLetter);
    // }
    playedWord.forEach((el, index) => {
      if (el === letter) {
        wordSetHolder[index] = letter
      }
    })
    setNewWordSet(wordSetHolder);
  }, [givenLetter]);

  console.log({
    playedWord: playedWord,
    letter: givenLetter,
    newWordSet: newWordSet,
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
