import { readFileSync } from 'fs';

interface CardInfo {
  [cardId: number]: number;
}

/**
 * @returns [cardId, numberOfWinningNumbers]
 */
const getNumWinningNumbers = (input: string): [number, number] => {
  const [cardIdStr, allNumbers] = input.split(':');
  const cardId = Number(cardIdStr.match(/[0-9]+/g)![0]);
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

  return [cardId, numWinning];
};

/**
 * Modifies numScratchcards to reflect the current number of scratchcards owned
 */
const getScratchcards = (cardId: number, numScratchcards: CardInfo): void => {
  const numWinningForCardId = numWinningNumbers[cardId];
  if (numWinningForCardId === 0) {
    return;
  } else {
    for (var i = cardId + 1; i < cardId + numWinningForCardId + 1; i++) {
      numScratchcards[i] = numScratchcards[i] + 1;
      getScratchcards(i, numScratchcards);
    }
  }
};

const RAW_DATA_BY_LINE: Array<string> = readFileSync(
  '4-input.txt',
  'utf-8'
).split('\n');

// Construct data structures to keep track of the winning numbers per card
// and the total number of scratch cards
const numWinningNumbers: CardInfo = {};
const numScratchcards: CardInfo = {};
RAW_DATA_BY_LINE.forEach((scratchcard) => {
  const [cardId, numWinning] = getNumWinningNumbers(scratchcard);
  numWinningNumbers[cardId] = numWinning;
  numScratchcards[cardId] = 1;
});

// Run recursion to find the total number of each scratchcard we end up with
for (var i = 0; i < RAW_DATA_BY_LINE.length; i++) {
  getScratchcards(i, numScratchcards);
}

// Find sum
let sum: number = 0;
for (var i = 1; i < RAW_DATA_BY_LINE.length + 1; i++) {
  sum += numScratchcards[i];
}
console.log(sum);
