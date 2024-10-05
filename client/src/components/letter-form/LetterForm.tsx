import {
  type FC,
  useRef,
  Dispatch,
  SetStateAction,
  FormEvent,
  useContext,
} from "react";

import { GameContext } from "../../context/game-context/GameContext";

type LetterFormProps = {
  letterErrors: number;
  letterExist: number;
  maxLetterExist: number;
  lettersSet: string[];
  setLetter: Dispatch<SetStateAction<any>>;
  setMessage: Dispatch<
    SetStateAction<{
      type: string;
      message: string;
    }>
  >;
  setLetterExist: Dispatch<SetStateAction<number>>;
  setLetterErrors: Dispatch<SetStateAction<number>>;
  setEvaluateLetterResponse: Dispatch<SetStateAction<string[]>>;
  setLettersSet: Dispatch<SetStateAction<string[]>>;
};

export const LetterForm: FC<LetterFormProps> = ({
  letterErrors,
  letterExist,
  maxLetterExist,
  lettersSet,
  setLetter,
  setMessage,
  setLetterExist,
  setLetterErrors,
  setEvaluateLetterResponse,
  setLettersSet,
}) => {
  const gameContext = useContext(GameContext);
  const playedWord = gameContext.playedWord;
  const level = gameContext.level;
  const guessLetter = useRef<HTMLInputElement>(null);
  const playedWordGame = [...playedWord];

  const handleOnGuessLetter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let letter: string | any = guessLetter.current?.value;
    setLetter(letter);
    if (!letter) {
      setMessage({
        type: "warning",
        message: "Please enter a letter!",
      });
    }
    if (lettersSet.indexOf(letter) === -1) {
      setLettersSet([...lettersSet, letter!]);
    }
    if (lettersSet.indexOf(letter) !== -1) {
      setMessage({
        type: "information",
        message: "You entered that letter already",
      });
    }
    if (
      playedWordGame.indexOf(letter) !== -1 &&
      lettersSet.indexOf(letter) === -1
    ) {
      setLetterExist((prevState) => prevState + 1);
      setMessage({
        type: "information",
        message: `The letter '${letter}' exist in the guessed word!`,
      });
      setEvaluateLetterResponse((prevState) => [...prevState, "Y"]);
    } else if (
      playedWordGame.indexOf(letter!) === -1 &&
      lettersSet.indexOf(letter!) === -1
    ) {
      setLetterErrors((prevState) => prevState + 1);
      setMessage({
        type: "warning",
        message: `The letter '${letter}' does not exist in the guessed word!`,
      });
      setEvaluateLetterResponse((prevState) => [...prevState, "X"]);
    }

    if (letterErrors === 3) {
      setMessage({
        type: "warning",
        message: "You reached the maximum mistakes!",
      });
    }

    if (letterExist === maxLetterExist) {
      setMessage({
        type: "information",
        message: `You reached the maximum number of correct answers ${maxLetterExist}!`,
      });
    }

    event.currentTarget.reset();
  };
  // console.log("letter form", {
  //   letterErrors: letterErrors,
  //   playedWord: playedWord,
  //   lettersSet: lettersSet
  // });
  return (
    <form onSubmit={handleOnGuessLetter} className="form-layout">
      <label htmlFor="letter">Guess Letter</label>
      <input
        type="text"
        id="letter"
        name="letter"
        ref={guessLetter}
        maxLength={1}
        disabled={
          letterExist === 2 && level === "Easy"
          ? true
          : letterErrors === 2 && level === "Easy"
          ? true
          : letterExist === 3 && level === "Medium"
          ? true
          : letterErrors === 4 && level === "Medium"
          ? true
          : letterExist === 3 && level === "Difficult"
          ? true
          : letterErrors === 3 && level === "Difficult"
          ? true
          : false
        }
        className="letter-input"
      />
      <button
        disabled={
          letterExist === 2 && level === "Easy"
          ? true
          : letterErrors === 2 && level === "Easy"
          ? true
          : letterExist === 3 && level === "Medium"
          ? true
          : letterErrors === 4 && level === "Medium"
          ? true
          : letterExist === 3 && level === "Difficult"
          ? true
          : letterErrors === 3 && level === "Difficult"
          ? true
          : false
        }
      >
        <span>Send</span>
      </button>
    </form>
  );
};
