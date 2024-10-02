import { type ReactNode, createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

import { WordsLevelEasy, WordsLevelMedium, WordsLevelDifficult } from '../../utils/words.ts';


type GameContextProps = {
  handleOnSelectLevel: (level: string) => void;
  playedWordSet: string[];
  playedWord: string;
  level: string;
  resetGame: number;
  setPlayedWord: Dispatch<SetStateAction<any>>;
  setLevel: Dispatch<SetStateAction<any>>;
  setResetGame: Dispatch<SetStateAction<number>>;
}

export const GameContext = createContext<GameContextProps>({
  handleOnSelectLevel: () => {},
  playedWordSet: [],
  playedWord: '',
  level: '',
  resetGame: 0,
  setPlayedWord: () => {},
  setLevel: () => {},
  setResetGame: () => {}
});

type GameContextProviderProps = {
  children: ReactNode;
}

const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [ level, setLevel ] = useState<string>('');
  const [ playedWord, setPlayedWord ] = useState<string>('');
  const [resetGame, setResetGame] = useState<number>(0);
  const playedWordSet = [...playedWord]
  let randomWord: number = Math.floor(Math.random() * 29);

  useEffect(() => {
    if (level === "Easy") {
      setPlayedWord(WordsLevelEasy[randomWord]);
    } else if (level === "Medium") {
      setPlayedWord(WordsLevelMedium[randomWord])
    } else if (level === "Difficult") {
      setPlayedWord(WordsLevelDifficult[randomWord]);
    }
  }, [level]);

  const handleOnSelectLevel = (level: string) => setLevel(level);

  // console.log("Context", {
  //   level: level,
  //   playedWord: playedWord,
  //   playedWordSet: playedWordSet,
  //   resetGame: resetGame
  // })

  return (
    <GameContext.Provider value={{playedWordSet, playedWord, level, resetGame, handleOnSelectLevel, setPlayedWord, setLevel, setResetGame}}>
      {children}
    </GameContext.Provider>
  )
};

export default GameContextProvider;