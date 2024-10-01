import { type FC, type FormEvent, useRef, useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import { GameContext } from "../../context/game-context/GameContext";
import WordSetDisplay from "../../components/word-set-display/WordSetDisplay";
import { WordsLevelEasy, WordsLevelMedium, WordsLevelDifficult } from '../../utils/words';

import "./board.css";

const Board: FC = () => {
  const gameContext = useContext(GameContext);
  const playedWord = gameContext.playedWord;
  const level = gameContext.level;
  const playedWordGame = [...playedWord];
  const [letter, setLetter] = useState<string | undefined>("");
  //handle the letter
  const [letterErrors, setLetterErrors] = useState<number>(0);
  const [letterExist, setLetterExist] = useState<number>(0);
  const [lettersSet, setLettersSet] = useState<string[]>([]);
  const [maxLetterExist, setMaxLetterExist] = useState<number>(2);
  const [evaluateLetterResponse, setEvaluateLetterResponse] = useState<
    string[]
  >([]);
  const guessLetter = useRef<HTMLInputElement>(null);
  //handle the letter
  //handle the word
  const guessWord = useRef<HTMLInputElement>(null);
  const [maxWordAttempts, setMaxWordAttempts] = useState<number>(1);
  const [wordErrors, setwordErrors] = useState<number>(0);
  //handle the word
  //reset word
  let randomWord: number = Math.floor(Math.random() * 29);
  //reset word
  const [message, setMessage] = useState<{ type: string; message: string }>({
    type: " " || "information" || "warning" || "success" || "fail",
    message: "",
  });

  useEffect(() => {
    if (level === "Medium") {
      setMaxLetterExist(3);
      setMaxWordAttempts(2);
    }

    if (level === "Difficult") {
      setMaxLetterExist(4);
      setMaxWordAttempts(3);
    }

    if (letterErrors === 3) {
      setMessage({
        type: "warning",
        message: "You reached the maximum mistakes!",
      });
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
    }

    if (letterExist === maxLetterExist) {
      setMessage({
        type: "information",
        message: `You reached the maximum number of correct answers ${maxLetterExist}!`,
      });
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
    }
  }, [letterErrors, letterExist]);

  const handleOnGuessLetter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let letter = guessLetter.current?.value;
    setLetter(letter!);
    // if (letter === "") {
    //   setMessage({
    //     type: "warning",
    //     message: "Please enter a letter!"
    //   });
    //   setTimeout(() => {
    //     setMessage({ type: "", message: "" });
    //   }, 3000);
    // }
    if (lettersSet.indexOf(letter!) === -1) {
      setLettersSet((prevState) => [...prevState, letter!]);
    }
    if (lettersSet.indexOf(letter!) !== -1) {
      setMessage({
        type: "information",
        message: "You entered that letter already",
      });
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
    }

    if (
      playedWordGame.indexOf(letter!) !== -1 &&
      lettersSet.indexOf(letter!) === -1
    ) {
      setLetterExist((prevState) => prevState + 1);
      setMessage({
        type: "information",
        message: `The letter '${letter}' exist in the guessed word!`,
      });
      setEvaluateLetterResponse((prevState) => [...prevState, "Y"]);
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
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
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
    }

    event.currentTarget.reset();
  };

  const handleOnGuessWord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let word = guessWord.current?.value;
    if (!word) {
      setMessage({
        type: "warning",
        message: "Please enter a word!"
      })
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
    }
    if (word === playedWord) {
      setMessage({
        type: "success",
        message: "Congratulations you guessed the word",
      });
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
    } else {
      setwordErrors((prevState) => prevState + 1);
    }
    if (maxWordAttempts === wordErrors) {
      setMessage({ type: "fail", message: "Game Over" });
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 3000);
    }
    event.currentTarget.reset();
  };
  // console.log({
  //   level: level,
  //   playedWord: playedWord,
  //   letterErrors: letterErrors,
  //   letterExist: letterExist,
  //   letterSet: lettersSet,
  //   message: message,
  //   evaluateLetterResponse: evaluateLetterResponse,
  //   maxWordAttempts: maxWordAttempts,
  //   wordErrors: wordErrors,
  // });

  const handleOnResetLevel = () => {
    if (level === "Easy") {
      gameContext.setPlayedWord(WordsLevelEasy[randomWord]);
    } else if (level === "Medium") {
      gameContext.setPlayedWord(WordsLevelMedium[randomWord])
    } else if (level === "Difficult") {
      gameContext.setPlayedWord(WordsLevelDifficult[randomWord]);
    }
    gameContext.setLevel(level)
  }

  return (
    <>
      <h1>Hangman</h1>
      <h3>Level {level}</h3>
      <section className="board-layout">
        <div className="restar-game">
          <Link to="/">
            <button onClick={() => gameContext.handleOnSelectLevel("")}>
              <span>Restar</span>
            </button>
          </Link>
        </div>
        <div className="reset-game">
          <button onClick={ handleOnResetLevel}>
            <span>Reset</span>
          </button>
        </div>
        <div className="guess-word">
          <WordSetDisplay letter={letter!} />
        </div>
        <section className="guess-letter-form guess-letter-layout">
          <form onSubmit={handleOnGuessLetter} className="form-layout">
            <label htmlFor="letter">Guess Letter</label>
            <input
              type="text"
              id="letter"
              name="letter"
              ref={guessLetter}
              maxLength={1}
              disabled={
                letterErrors === 3
                  ? true
                  : false || letterExist === maxLetterExist
                  ? true
                  : maxWordAttempts === wordErrors
                  ? true
                  : false
              }
              className="letter-input"
            />
            <button
              disabled={
                letterErrors === 3
                  ? true
                  : false || letterExist === maxLetterExist
                  ? true
                  : maxWordAttempts === wordErrors
                  ? true
                  : false
              }
            >
              <span>Send</span>
            </button>
          </form>
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
                maxWordAttempts === wordErrors
                  ? true
                  : lettersSet.length === 0
                  ? true
                  : false
              }
            />
            <button
              disabled={
                maxWordAttempts === wordErrors
                  ? true
                  : lettersSet.length === 0
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
