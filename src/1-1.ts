import { readFileSync } from 'fs';

const rawDataByLine: Array<string> = readFileSync('1-input.txt', 'utf-8').split(
  '\n'
);
const numbersPerLine = rawDataByLine.map((line) => {
  const characters = line.split('');
  const onlyNumbers = characters.filter((char) => !isNaN(Number(char)));
  return Number(onlyNumbers[0] + onlyNumbers[onlyNumbers.length - 1]);
});
console.log(numbersPerLine.reduce((acc, el) => acc + el, 0));
