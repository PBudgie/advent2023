import { readFileSync } from 'fs';

interface DiceDraw {
  red: number;
  green: number;
  blue: number;
}

const getMinimumDice = (input: string): DiceDraw => {
  const diceSubsets = input.split(';').map((subset) => {
    let draws: DiceDraw = {
      red: 0,
      green: 0,
      blue: 0,
    };
    subset.split(',').forEach((diceColor: string) => {
      const numOfDiceStr = diceColor
        .split('')
        .filter((char) => /^[0-9]$/.test(char))
        .join('');
      const numOfDice = Number(numOfDiceStr);

      if (diceColor.includes('red')) {
        draws['red'] = numOfDice;
      } else if (diceColor.includes('green')) {
        draws['green'] = numOfDice;
      } else {
        draws['blue'] = numOfDice;
      }
    });
    return draws;
  });

  let minimumDice: DiceDraw = { red: 0, green: 0, blue: 0 };
  diceSubsets.forEach((subset) => {
    if (subset.red > minimumDice.red) {
      minimumDice.red = subset.red;
    }
    if (subset.green > minimumDice.green) {
      minimumDice.green = subset.green;
    }
    if (subset.blue > minimumDice.blue) {
      minimumDice.blue = subset.blue;
    }
  });
  return minimumDice;
};

const rawDataByLine: Array<string> = readFileSync('2-input.txt', 'utf-8').split(
  '\n'
);
const minimumDiceForGames = rawDataByLine.map((inputGame) => {
  const [gameIdStr, diceSubsets] = inputGame.split(':');
  return getMinimumDice(diceSubsets);
});
const products = minimumDiceForGames.map(
  (minDice: DiceDraw) => minDice.red * minDice.green * minDice.blue
);
console.log(products.reduce((acc, el) => acc + el, 0));
