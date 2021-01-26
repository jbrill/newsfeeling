/* eslint-disable no-unused-vars */
export const AFINN = require(".././AFINN.json");

export function tokenize(text) {
  return text.toLowerCase().split(" ");
}

export function deleteUselessChars(word) {
  return word.replace(/[^\w]/g, "");
}

export function rateWord(word) {
  return (word in AFINN) ? AFINN[word] : 0;
}

export function sum(x, y) {
  return Number(x) + Number(y);
}

export function analyze(text) {
  return tokenize(text).map(deleteUselessChars).map(rateWord).reduce(sum);
}

export function mapValuesInRange(n, start1, stop1, start2, stop2) {
  return Math.round((
    (n - start1) / (stop1 - start1)
  ) * (stop2 - start2) + start2);
}

export function componentToHex(c) {
  var hex = c.toString(16);
  console.log(hex)
  return hex.length == 1 ? `0${hex}` : hex;
}

export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getColorFromSentimentScore(sentimentScore) {
  /*
    Red 255, 0, 0
    Yellow 255, 255, 0
    Green 0, 255, 0
  */
  let rCol, bCol, gCol;
  if (sentimentScore > 0) {
    rCol = mapValuesInRange(sentimentScore, 1, 10, 255, 0);
    bCol = 255;
    gCol = 0;
  } else {
    rCol = 255;
    bCol = mapValuesInRange(sentimentScore, 0, -20, 255, 0);
    gCol = 0;
  }
  console.log(rCol)
  console.log(bCol)
  console.log(gCol)
  return rgbToHex(rCol, bCol, gCol);
}