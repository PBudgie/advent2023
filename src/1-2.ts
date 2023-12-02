import { readFileSync } from 'fs';

const validTokenToValue = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const validTokens = Object.keys(validTokenToValue);

const rawDataByLine: Array<string> = readFileSync('1-input.txt', 'utf-8').split(
  '\n'
);
const digitRegex = new RegExp(validTokens.join('|'), 'g');
const calibrationValues = rawDataByLine.map((line) => {
  const firstDigitMatch = line.match(digitRegex);
  if (!firstDigitMatch) {
    return 0;
  }
  const firstDigit: number = validTokenToValue[firstDigitMatch[0]];

  let lastDigit = null;
  for (var i = line.length; i >= 0 && !lastDigit; i--) {
    const lastDigitMatch = line.slice(i).match(digitRegex);
    console.log(line.slice(i));
    if (lastDigitMatch && lastDigitMatch.length > 0) {
      // Found a match
      lastDigit = validTokenToValue[lastDigitMatch[lastDigitMatch.length - 1]];
    }
  }
  if (!lastDigit) {
    return 0;
  }

  return firstDigit * 10 + lastDigit;
});
console.log(calibrationValues);
console.log(calibrationValues.reduce((acc, el) => acc + el, 0));
