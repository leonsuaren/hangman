const useCreateEmptyArray = (arrayLenght: number) => {
  let newWordSetAmptyArray: string[] = [];
  for (let i = 0; i < arrayLenght; i++) {  
    newWordSetAmptyArray.push(" ");;
  }
  return newWordSetAmptyArray;
}

export default useCreateEmptyArray;