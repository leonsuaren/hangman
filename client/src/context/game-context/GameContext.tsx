import { type ReactNode, createContext, useState, useEffect } from 'react';

import { WordsLevelEasy, WordsLevelMedium, WordsLevelDifficult } from '../../utils/words.ts';


type GameContextProps = {
  handleOnSelectLevel: (level: string) => void;
  playedWordSet: string[];
  playedWord: string;
  level: string;
}

export const GameContext = createContext<GameContextProps>({
  handleOnSelectLevel: () => {},
  playedWordSet: [],
  playedWord: '',
  level: ''
});

type GameContextProviderProps = {
  children: ReactNode;
}

const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [ level, setLevel ] = useState<string>('');
  const [ playedWord, setPlayedWord ] = useState<string>('');
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


  const handleOnSelectLevel = (level: string) => {
    setLevel(level);
  }

  return (
    <GameContext.Provider value={{playedWordSet, playedWord, level, handleOnSelectLevel}}>
      {children}
    </GameContext.Provider>
  )
};

export default GameContextProvider;