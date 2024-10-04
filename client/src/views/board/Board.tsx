import {
  type FC,
  type FormEvent,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";

import { Link } from "react-router-dom";

import { GameContext } from "../../context/game-context/GameContext";
import WordSetDisplay from "../../components/word-set-display/WordSetDisplay";
import {
  WordsLevelEasy,
  WordsLevelMedium,
  WordsLevelDifficult,
} from "../../utils/words";

import "./board.css";
import { LetterForm } from "../../components/letter-form/LetterForm";

const Board: FC = () => {
  const gameContext = useContext(GameContext);
  const playedWord = gameContext.playedWord;
  const level = gameContext.level;
  const [letter, setLetter] = useState<string | undefined>("");
  //handle the letter
  const [letterErrors, setLetterErrors] = useState<number>(0);
  const [letterExist, setLetterExist] = useState<number>(0);
  const [lettersSet, setLettersSet] = useState<string[]>([]);
  const [maxLetterExist, setMaxLetterExist] = useState<number>(2);
  const [evaluateLetterResponse, setEvaluateLetterResponse] = useState<
    string[]
  >([]);
  const [guessLetter, setGuessLetter] = useState<string | undefined>('');
  //handle the letter
  //handle the word
  const guessWord = useRef<HTMLInputElement>(null);
  const [maxWordAttempts, setMaxWordAttempts] = useState<number>(1);
  const [wordErrors, setwordErrors] = useState<number>(0);
  const [guessedWord, setGuessedWord] = useState<string | undefined>("");
  //handle the word
  //reset word
  let randomWord: number = Math.floor(Math.random() * 29);
  //reset word
  const [message, setMessage] = useState<{ type: string; message: string }>({
    type: " " || "information" || "warning" || "success" || "fail",
    message: "",
  });

  useEffect(() => {
    let cleanMessage: any;
    if (message.type === "information" || "warning" || "success" || "fail") {
      cleanMessage = setTimeout(() => {
        setMessage({
          type: " ",
          message: " ",
        });
      }, 3000);
    }
    if (level === "Medium") {
      setMaxLetterExist(3);
      setMaxWordAttempts(2);
    }

    if (level === "Difficult") {
      setMaxLetterExist(4);
      setMaxWordAttempts(3);
    }
    return () => clearTimeout(cleanMessage);
  }, [letterErrors, letterExist]);

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
      setwordErrors((prevState) => prevState + 1);
    }
    if (maxWordAttempts === wordErrors) {
      setMessage({ type: "fail", message: "Game Over" });
    }
    if (maxWordAttempts >= 2 && level === "Easy") {
      setMessage;
    }
    event.currentTarget.reset();
  };
  console.log("Board", {
    level: level,
    playedWord: playedWord,
    letterErrors: letterErrors,
    letterExist: letterExist,
    letterSet: lettersSet,
    message: message,
    evaluateLetterResponse: evaluateLetterResponse,
    maxWordAttempts: maxWordAttempts,
    wordErrors: wordErrors,
    guessLetter: guessLetter
  });

  const handleOnRestartGame = () => {
    gameContext.handleOnSelectLevel(" ");
    if (level === "Easy") {
      gameContext.setPlayedWord(WordsLevelEasy[randomWord]);
    } else if (level === "Medium") {
      gameContext.setPlayedWord(WordsLevelMedium[randomWord]);
    } else if (level === "Difficult") {
      gameContext.setPlayedWord(WordsLevelDifficult[randomWord]);
    }
    gameContext.setLevel(level);
    setMessage({ type: "", message: "" });
    setLetterErrors(0);
    setLetterExist(0);
    setLettersSet([]);
    setEvaluateLetterResponse([]);
    setMaxWordAttempts(0);
    setGuessedWord("");
    gameContext.setResetGame(0);
  };

  const handleOnResetLevel = () => {
    if (level === "Easy") {
      gameContext.setPlayedWord(WordsLevelEasy[randomWord]);
    } else if (level === "Medium") {
      gameContext.setPlayedWord(WordsLevelMedium[randomWord]);
    } else if (level === "Difficult") {
      gameContext.setPlayedWord(WordsLevelDifficult[randomWord]);
    }
    gameContext.setLevel(level);
    setMessage({ type: "", message: "" });
    setLetterErrors(0);
    setLetterExist(0);
    setLettersSet([]);
    setEvaluateLetterResponse([]);
    setMaxWordAttempts(0);
    setGuessedWord("");
    gameContext.setResetGame((prevState) => prevState + 1);
  };

  return (
    <>
      <h1>Hangman</h1>
      <h3>Level {level}</h3>
      <section className="board-layout">
        <div className="restar-game">
          <Link to="/">
            <button onClick={handleOnRestartGame}>
              <span>Restar</span>
            </button>
          </Link>
        </div>
        <div className="reset-game">
          <button
            onClick={handleOnResetLevel}
            disabled={
              letterExist >= 2 && level === "Easy"
                ? true
                : letterErrors >= 2 && level === "Easy"
                ? true
                : letterExist >= 3 && level === "Medium"
                ? true
                : letterErrors >= 3 && level === "Medium"
                ? true
                : letterExist >= 3 && level === "Difficult"
                ? true
                : letterErrors >= 3 && level === "Difficult"
                ? true
                : gameContext.resetGame >= 2
                ? true
                : false
            }
          >
            <span>Reset</span>
          </button>
        </div>
        <div className="guess-word">
          <WordSetDisplay letter={letter!} word={guessedWord!} />
        </div>
        <section className="guess-letter-form guess-letter-layout">
          <LetterForm
            letterErrors={letterErrors}
            letterExist={letterExist}
            maxWordAttempts={maxWordAttempts}
            wordErrors={wordErrors}
            maxLetterExist={maxLetterExist}
            setGuessLetter={setGuessLetter}
            setLetter={setLetter}
            setLetterErrors={setLetterErrors}
            setLetterExist={setLetterExist}
            setMessage={setMessage}
            setEvaluateLetterResponse={setEvaluateLetterResponse}
            setLettersSet={setLettersSet}
            lettersSet={lettersSet}
          />
          <div className="errors-and-correct">
            {evaluateLetterResponse.map((response, key) => {
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
          <div></div>
        </section>
        <section className="guess-word-form">
          <form onSubmit={handleOnGuessWord}>
            <label htmlFor="letter">Guess the Word</label>
            <input
              className="guess-letter-input"
              type="text"
              name="word"
              ref={guessWord}
              disabled={
                letterExist === 0 && letterErrors === 0
                  ? true
                  : letterExist === 0 && letterErrors === 1
                  ? false
                  : letterExist === 1 && letterErrors === 0
                  ? false
                  : maxWordAttempts >= 2 && level === "Easy"
                  ? true
                  : maxWordAttempts >= 3 && level === "Medium"
                  ? true
                  : maxWordAttempts === 3 && level === "Difficult"
                  ? true
                  : false
              }
            />
            <button
              disabled={
                letterExist === 0 && letterErrors === 0
                  ? true
                  : letterExist === 0 && letterErrors === 1
                  ? false
                  : letterExist === 1 && letterErrors === 0
                  ? false
                  : maxWordAttempts >= 2 && level === "Easy"
                  ? true
                  : maxWordAttempts >= 3 && level === "Medium"
                  ? true
                  : maxWordAttempts === 3 && level === "Difficult"
                  ? true
                  : false
              }
            >
              <span>Good Lock!</span>
            </button>
          </form>
        </section>
        <div className="messages">
          <div
            className={
              message.type === "information"
                ? "information-message"
                : message.type === "warning"
                ? "warning-message"
                : message.type === "success"
                ? "success-message"
                : message.type === "fail"
                ? "game-over-message"
                : "default"
            }
          >
            <p>{message.message}</p>
          </div>
        </div>
        <div className="statistics">
          <h2>Estatistics</h2>
        </div>
      </section>
    </>
  );
};

export default Board;
