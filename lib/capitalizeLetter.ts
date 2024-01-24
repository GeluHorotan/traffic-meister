export const capitalizeLetter = (word: string) => {
  let result = word.charAt(0).toUpperCase() + word.slice(1);
  return result;
};
