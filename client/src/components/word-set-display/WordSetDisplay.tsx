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
    let letterIndex: number;
    const newArray: string[] = newWordSetArray;
    if (playedWord.indexOf(givenLetter) !== -1) {
      letterIndex = playedWord.indexOf(givenLetter);
      newArray.splice(letterIndex, 1, givenLetter);
    }
    setNewWordSet(newArray);
  }, [playedWord]);

  console.log({
    playedWord: playedWord,
    lettersSet: letter,
    letter: givenLetter,
    newWordSetArray: newWordSetArray,
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

// setNewWordSet([
//   ...newWordSetArray.slice(0, letterIndex),
//   givenLetter,
//   ...newWordSetArray.slice(letterIndex),
// ]);
