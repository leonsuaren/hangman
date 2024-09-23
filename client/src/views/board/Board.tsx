import { type FC, type FormEvent, useRef, useState } from "react";

type BoardProps = {
  level: string;
  playedWord: string;
};

const Board: FC<BoardProps> = ({ level, playedWord }) => {
  const [letter, setLetter] = useState<string | undefined>("");
  const [errors, setErrors] = useState<number>(0);
  const [lettersSet, setLettersSet] = useState<string[]>([]);
  const [letterExist, setLetterExist] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const guessLetter = useRef<HTMLInputElement>(null);
  const playedWordGame = [...playedWord];

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let letter = guessLetter.current?.value;
    if (lettersSet.indexOf(letter!) < 0) {
      setLettersSet((prevState) => 
       [...prevState, letter!]
      );
    } 
    if (lettersSet.indexOf(letter!) >= 0) {
      // setLettersSet(prevState => prevState)
      setMessage("You entered that letter already");
      setTimeout(() => {
        setMessage('');
      }, 3000)
    }
    setLetter(letter);
    if (playedWordGame.indexOf(letter!) >= 0 && lettersSet.indexOf(letter!) < 0) {
      setLetterExist((prevState) => prevState + 1);
    } else if (playedWordGame.indexOf(letter!) === -1 && lettersSet.indexOf(letter!) < 0) {
      setErrors((prevState) => prevState + 1);
    }
  };
  console.log({
    letter: letter,
    playedWord: playedWord,
    Errors: errors,
    letterExist: letterExist,
    letterSet: lettersSet,
    message: message,
  });

  return (
    <>
      <h1>Hangman</h1>
      <h2>Level {level}</h2>
      <form onSubmit={handleOnSubmit}>
        <label>Guess Letter</label>
        <input
          type="text"
          id="letter"
          ref={guessLetter}
          maxLength={1}
          disabled={
            errors === 3 ? true : false || letterExist === 2 ? true : false
          }
        />
        <button
          disabled={
            errors === 3 ? true : false || letterExist === 2 ? true : false
          }
        >
          Guess Letter
        </button>
        <p>{message}</p>
      </form>
    </>
  );
};

export default Board;
