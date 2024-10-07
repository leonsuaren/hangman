import {
  type FC,
  useRef,
  FormEvent,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

import { GameContext } from "../../context/game-context/GameContext";

type WordFormProps = {
  maxWordAttempts: number;
  wordErrors: number;
  letterExist: number;
  letterErrors: number;
  setGuessedWord: Dispatch<SetStateAction<any>>;
  setMessage: Dispatch<
    SetStateAction<{
      type: string;
      message: string;
    }>
  >;
  setMaxWordAttempts: Dispatch<SetStateAction<number>>;
  setWordErrors: Dispatch<SetStateAction<number>>;
};

export const WordForm: FC<WordFormProps> = ({
  maxWordAttempts,
  wordErrors,
  letterExist,
  letterErrors,
  setGuessedWord,
  setMessage,
  setMaxWordAttempts,
  setWordErrors,
}) => {
  const gameContext = useContext(GameContext);
  const playedWord = gameContext.playedWord;
  const level = gameContext.level;
  const guessWord = useRef<HTMLInputElement>(null);

  const handleOnGuessWord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let word = guessWord.current?.value;
    setGuessedWord(word);
    if (!word) {
      setMessage({
        type: "warning",
        message: "Please enter a word!",
      });
    } else if (word) {
      setMaxWordAttempts((prevState) => prevState + 1);
    }
    if (word === playedWord) {
      setMessage({
        type: "success",
        message: "Congratulations you guessed the word",
      });
    } else {
      setWordErrors((prevState) => prevState + 1);
    }
    if (maxWordAttempts === wordErrors) {
      setMessage({ type: "fail", message: "Game Over" });
    }
    if (maxWordAttempts >= 2 && level === "Easy") {
      setMessage;
    }
    event.currentTarget.reset();
  };

  console.log('Word Form', {
    maxWordAttempts: maxWordAttempts,
    letterErrors: letterErrors,
    letterExist: letterExist,
    level: level
  });

  return (
    <form onSubmit={handleOnGuessWord}>
      <label htmlFor="letter">Guess the Word</label>
      <input
        className="guess-letter-input"
        type="text"
        name="word"
        ref={guessWord}
        disabled={
             letterExist >= 1 || letterErrors >= 1
            ? false
            : maxWordAttempts === 2 && level === 'Easy'
            ? true
            // : maxWordAttempts === 3 && level === "Medium"
            // ? true
            // : maxWordAttempts === 3 && level === "Difficult"
            // ? true
            : true
        }
      />
      <button
        disabled={
          letterExist === 0 && letterErrors === 0
            ? true
            : letterExist === 1 || letterErrors === 1
            ? false
            : maxWordAttempts === 2 && level === "Easy"
            ? true
            : maxWordAttempts === 3 && level === "Medium"
            ? true
            : maxWordAttempts === 3 && level === "Difficult"
            ? true
            : false
        }
      >
        <span>Good Lock!</span>
      </button>
    </form>
  );
};
