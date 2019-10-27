export const enumToHashtagWord = (enumWord) => {
  let normalWord = enumWord.replace(/_/g, " ").toLowerCase();
  let wordArray = normalWord.split(" ");
  let finalWord = wordArray
    .map((word) => "#" + word.charAt(0).toUpperCase() + word.substr(1))
    .join(" ");
  return finalWord;
};
