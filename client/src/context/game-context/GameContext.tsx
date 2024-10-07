import { type ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

import { WordsLevelEasy, WordsLevelMedium, WordsLevelDifficult } from '../../utils/words.ts';
import useCreateEmptyArray from '../../utils/useCreateEmptyArray.ts';


type GameContextProps = {
  handleOnSelectLevel: (level: string) => void;
  playedWordSet: string[];
  playedWord: string;
  level: string;
  resetGame: number;
  newWordSet: string[];
  newWordSetArray: string[];
  setPlayedWord: Dispatch<SetStateAction<any>>;
  setLevel: Dispatch<SetStateAction<any>>;
  setResetGame: Dispatch<SetStateAction<number>>;
  setNewWordSet: Dispatch<SetStateAction<string[]>>;
}

export const GameContext = createContext<GameContextProps>({
  handleOnSelectLevel: () => {},
  playedWordSet: [],
  playedWord: '',
  level: '',
  resetGame: 0,
  newWordSet: [],
  newWordSetArray: [],
  setPlayedWord: () => {},
  setLevel: () => {},
  setResetGame: () => {},
  setNewWordSet: () => {}
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

  /* Handle Word Set Display */
  const playedWordLength = playedWord.length;
  let newWordSetArray = useCreateEmptyArray(playedWordLength);
  const [newWordSet, setNewWordSet] = useState<string[]>(newWordSetArray);
  /* Handle Word Set Display */


  const handleOnSelectLevel = (level: string) => {
    setLevel(level)
    if (level === "Easy") {
      setPlayedWord(WordsLevelEasy[randomWord]);
    } else if (level === "Medium") {
      setPlayedWord(WordsLevelMedium[randomWord])
    } else if (level === "Difficult") {
      setPlayedWord(WordsLevelDifficult[randomWord]);
    }
  };

  console.log("Context", {
    level: level,
    playedWord: playedWord,
    playedWordSet: playedWordSet,
    resetGame: resetGame,
    newWordSetArray: newWordSetArray
  })

  return (
    <GameContext.Provider value={{playedWordSet, playedWord, level, resetGame, newWordSet, newWordSetArray, handleOnSelectLevel, setPlayedWord, setLevel, setResetGame, setNewWordSet}}>
      {children}
    </GameContext.Provider>
  )
};

export default GameContextProvider;