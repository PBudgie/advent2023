import { readFileSync } from 'fs';

interface DiceDraw {
  red: number;
  green: number;
  blue: number;
}

const ELFS_BAG = {
  red: 12,
  green: 13,
  blue: 14,
};

const isValidGame = (input: string): boolean => {
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

  const diceSubsetsAreValid: Array<boolean> = diceSubsets.map((subset) => {
    return (
      subset.red <= ELFS_BAG.red &&
      subset.green <= ELFS_BAG.green &&
      subset.blue <= ELFS_BAG.blue
    );
  });

  return !diceSubsetsAreValid.includes(false);
};

const rawDataByLine: Array<string> = readFileSync('2-input.txt', 'utf-8').split(
  '\n'
);
const validGameIds: Array<number> = [];
rawDataByLine.forEach((inputGame) => {
  const [gameIdStr, diceSubsets] = inputGame.split(':');
  const gameId = Number(gameIdStr.split(' ')[1]);
  if (isValidGame(diceSubsets)) {
    validGameIds.push(gameId);
  }
});
console.log(validGameIds.reduce((acc, el) => acc + el, 0));
