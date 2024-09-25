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
  const [evaluateResponse, setEvaluateResponse] = useState<string[]>([]);
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

    if (
      playedWordGame.indexOf(letter!) !== -1 &&
      lettersSet.indexOf(letter!) === -1
    ) {
      setLetterExist((prevState) => prevState + 1);
      setMessage(`The letter '${letter}' exist in the guessed word!`);
      setEvaluateResponse((prevState) => [...prevState, "Y"]);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else if (
      playedWordGame.indexOf(letter!) === -1 &&
      lettersSet.indexOf(letter!) === -1
    ) {
      setErrors((prevState) => prevState + 1);
      setMessage(`The letter '${letter}' does not exist in the guessed word!`);
      setEvaluateResponse((prevState) => [...prevState, "X"]);
      setTimeout(() => {
        setMessage("");
      }, 3000);
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
    evaluateResponse: evaluateResponse,
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
              className="letter-input"
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
              Send
            </button>
          </form>
          <div className="errors-and-correct">
            {evaluateResponse.map((response, key) => {
              if (response === "X") {
                return (
                  <p key={key} className="letter-not-in-word">
                    {response}
                  </p>
                );
              } else {
                return (
                  <p key={key} className="letter-in-word">
                    &#10003;
                  </p>
                );
              }
            })}
          </div>
          <div>
          </div>
        </section>
        <form className="guess-word-form">
          <input type="text" />
        </form>
        <div className="messages">
          <p>{message}</p>
        </div>
        <div className="statistics">
          <h2>Estatistics</h2>
        </div>
      </section>
    </>
  );
};

export default Board;
