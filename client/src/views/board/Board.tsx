import { type FC, type FormEvent, useRef, useState, useEffect } from "react";

type BoardProps = {
  level: string;
  playedWord: string;
};

const Board: FC<BoardProps> = ({ level, playedWord }) => {
  const [errors, setErrors] = useState<number>(0);
  const [letterExist, setLetterExist] = useState<number>(0);
  const [lettersSet, setLettersSet] = useState<string[]>([]);
  const [maxLetterExist, setMaxLetterExist] = useState<number>(2);
  const [message, setMessage] = useState<string>("");
  const guessLetter = useRef<HTMLInputElement>(null);
  const playedWordGame = [...playedWord];

  useEffect(() => {
    if (level === "Medium") {
      setMaxLetterExist(3);
    }

    if (level === "Difficult") {
      setMaxLetterExist(4);
    }

    if (errors === 3) {
      setMessage("You reached the maximum errors!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    if (letterExist === maxLetterExist) {
      setMessage(
        `You reached the maximum number of correct answers ${maxLetterExist}!`
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [errors, letterExist]);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let letter = guessLetter.current?.value;

    if (lettersSet.indexOf(letter!) === -1) {
      setLettersSet((prevState) => [...prevState, letter!]);
    }
    if (lettersSet.indexOf(letter!) !== -1) {
      setMessage("You entered that letter already");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    //

    if (
      playedWordGame.indexOf(letter!) !== -1 &&
      lettersSet.indexOf(letter!) === -1
    ) {
      setLetterExist((prevState) => prevState + 1);
    } else if (
      playedWordGame.indexOf(letter!) === -1 &&
      lettersSet.indexOf(letter!) === -1
    ) {
      setErrors((prevState) => prevState + 1);
    }

    event.currentTarget.reset();
  };
  console.log({
    level: level,
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
      <section className="board-layout">
        <div className="restar-game">
          <button>
            <span>Restar Game</span>
          </button>
        </div>
        <div className="reset-game">
          <button>
            <span>Reset Game</span>
          </button>
        </div>
        <div className="guess-word">
          <h2>Guess Word</h2>
        </div>
        <section className="guess-letter-form guess-letter-layout">
          <form onSubmit={handleOnSubmit} className="form-layout">
            <label>Guess Letter</label>
            <input
              type="text"
              id="letter"
              ref={guessLetter}
              maxLength={1}
              disabled={
                errors === 3
                  ? true
                  : false || letterExist === maxLetterExist
                  ? true
                  : false
              }
            />
            <button
              disabled={
                errors === 3
                  ? true
                  : false || letterExist === maxLetterExist
                  ? true
                  : false
              }
            >
              Guess Letter
            </button>
          </form>
          <div className="errors-and-correct"><h2>errors and correct</h2></div>
          <div className="guessed-letter-messages"><h3>{message}</h3></div>
        </section>
        <form className="guess-word-form">
          <input type="text" />
        </form>
        <div className="messages">
          <h2>Messages</h2>
        </div>
        <div className="statistics">
          <h2>Estatistics</h2>
        </div>
      </section>
    </>
  );
};

export default Board;
