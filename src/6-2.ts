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
const TIME_INPUT = Number(
  RAW_DATA_BY_LINE[0]
    .split('')
    .filter((char) => char.match(/^[0-9]$/))
    .join('')
);
const DISTANCE_INPUT = Number(
  RAW_DATA_BY_LINE[1]
    .split('')
    .filter((char) => char.match(/^[0-9]$/))
    .join('')
);

console.log(getNumWinning(TIME_INPUT, DISTANCE_INPUT));
