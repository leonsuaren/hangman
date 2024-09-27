import { useEffect, useState, type FC } from "react";

import useCreateEmptyArray from "../../utils/useCreateEmptyArray.ts";

type WordSetDisplayProps = {
  playedWord: string[];
  lettersSet: string[];
};

const WordSetDisplay: FC<WordSetDisplayProps> = ({
  playedWord,
  lettersSet,
}) => {
  //create an empty array
  const newWordSetArray = useCreateEmptyArray(playedWord.length);
  //create an empty array

  let givenLetter: string = lettersSet[0]; //Find a solution
  const [newWordSet, setNewWordSet] = useState<string[]>(newWordSetArray);

  useEffect(() => {
    let letterIndex: number;
    if (playedWord.indexOf(givenLetter) !== -1) {
      letterIndex = playedWord.indexOf(givenLetter);
      setNewWordSet([
        ...newWordSetArray.slice(0, letterIndex),
        givenLetter,
        ...newWordSetArray.slice(letterIndex),
      ]);
    }
  }, [lettersSet]);

  console.log({
    playedWord: playedWord,
    lettersSet: lettersSet,
    letter: givenLetter,
    emptyArray: newWordSetArray,
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
          <div key={key} className="word-base">{word}</div>
        ))}
      </div>
    </div>
  );
};

export default WordSetDisplay;
