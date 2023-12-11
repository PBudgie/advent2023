import { readFileSync } from 'fs';

const getNumWinning = (time: number, recordDistance: number): number => {
  let numWinning: number = 0;
  for (var i = 0; i <= time; i++) {
    // i represents how much time we're holding the button, and also the
    // the boat speed when we let go of the button
    const distanceTraveled = i * (time - i);
    if (distanceTraveled > recordDistance) {
      numWinning++;
    }
  }
  return numWinning;
};

const RAW_DATA_BY_LINE: Array<string> = readFileSync(
  '6-input.txt',
  'utf-8'
).split('\n');
const TIME_INPUT = RAW_DATA_BY_LINE[0].match(/[0-9]+/g);
const DISTANCE_INPUT = RAW_DATA_BY_LINE[1].match(/[0-9]+/g);

const numberOfWaysToWin: Array<number> = [];
for (var i = 0; i < TIME_INPUT!.length; i++) {
  const time: number = TIME_INPUT === null ? 0 : Number(TIME_INPUT[i]);
  const distance: number =
    DISTANCE_INPUT === null ? 0 : Number(DISTANCE_INPUT[i]);
  numberOfWaysToWin.push(getNumWinning(time, distance));
}
console.log(numberOfWaysToWin.reduce((acc, el) => acc * el, 1));
