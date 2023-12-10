import { readFileSync } from 'fs';

const getPointsForCard = (input: string): number => {
  const [cardId, allNumbers] = input.split(':');
  const [winningNumbersStr, numbersYouHaveStr] = allNumbers.split('|');
  const winningNumbers: Array<number> = winningNumbersStr
    .match(/[0-9]+/g)!
    .map((number) => Number(number));
  const numbersYouHave: Array<number> = numbersYouHaveStr
    .match(/[0-9]+/g)!
    .map((number) => Number(number));
  const numWinning: number = numbersYouHave.reduce((acc, el) => {
    if (winningNumbers.includes(el)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  if (numWinning === 0) {
    return 0;
  }
  return Math.pow(2, numWinning - 1);
};

const RAW_DATA_BY_LINE: Array<string> = readFileSync(
  '4-input.txt',
  'utf-8'
).split('\n');
const points = RAW_DATA_BY_LINE.map((line) => getPointsForCard(line));
console.log(points.reduce((acc: number, el: number) => acc + el, 0));
