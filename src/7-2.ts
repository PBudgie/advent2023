import { readFileSync } from 'fs';

type Hand =
  | 'FIVE_OF_A_KIND'
  | 'FOUR_OF_A_KIND'
  | 'FULL_HOUSE'
  | 'THREE_OF_A_KIND'
  | 'TWO_PAIR'
  | 'ONE_PAIR'
  | 'HIGH_CARD';
const RANKED_HANDS: Array<Hand> = [
  'FIVE_OF_A_KIND',
  'FOUR_OF_A_KIND',
  'FULL_HOUSE',
  'THREE_OF_A_KIND',
  'TWO_PAIR',
  'ONE_PAIR',
  'HIGH_CARD',
];
const RANKED_CARDS: Array<string> = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'J',
];

/**
 * Returns the hand of the card after using J's as a wildcard.
 * @param cards A hand of 5 cards
 */
const getHand = (cards: string): Hand => {
  const numOfJs = cards.split('').filter((card) => card === 'J').length;
  if (numOfJs === 5) {
    return 'FIVE_OF_A_KIND';
  }
  const cardDistributionWithoutJs: object = cards
    .split('')
    .reduce((acc, el) => {
      if (el === 'J') {
        return acc;
      } else if (el in acc) {
        acc[el] = acc[el] + 1;
      } else if (!(el in acc)) {
        acc[el] = 1;
      }
      return acc;
    }, {});

  // Distribution of cards, sorted in descending order
  const distributionValues = Object.values(cardDistributionWithoutJs).sort(
    (a, b) => b - a
  );
  // Add the number of Js to the highest number of same cards
  distributionValues[0] = distributionValues[0] + numOfJs;

  if (distributionValues.includes(5)) {
    return 'FIVE_OF_A_KIND';
  } else if (distributionValues.includes(4)) {
    return 'FOUR_OF_A_KIND';
  } else if (
    distributionValues.includes(3) &&
    distributionValues.length === 2
  ) {
    return 'FULL_HOUSE';
  } else if (distributionValues.includes(3)) {
    return 'THREE_OF_A_KIND';
  } else if (
    distributionValues.includes(2) &&
    distributionValues.length === 3
  ) {
    return 'TWO_PAIR';
  } else if (distributionValues.includes(2)) {
    return 'ONE_PAIR';
  } else {
    return 'HIGH_CARD';
  }
};

const RAW_DATA: Array<[string, number]> = readFileSync('7-input.txt', 'utf-8')
  .split('\n')
  .map((line) => {
    const [hand, bid] = line.split(' ');
    return [hand, Number(bid)];
  });

// Weakest hand is FIRST, strongest hand is last
const sortedHands = RAW_DATA.sort((data1, data2) => {
  const hand1 = getHand(data1[0]);
  const hand2 = getHand(data2[0]);
  if (hand1 !== hand2) {
    return RANKED_HANDS.indexOf(hand2) - RANKED_HANDS.indexOf(hand1);
  } else {
    for (var i = 0; i < data1[0].length; i++) {
      const currentHand1Card = data1[0].slice(i, i + 1);
      const currentHand2Card = data2[0].slice(i, i + 1);
      if (currentHand1Card !== currentHand2Card) {
        return (
          RANKED_CARDS.indexOf(currentHand2Card) -
          RANKED_CARDS.indexOf(currentHand1Card)
        );
      }
    }
    return 0; // All cards are the same and in the same order. These two hands are equal in rank.
  }
});

let winnings = 0;
for (var i = 0; i < sortedHands.length; i++) {
  winnings += (i + 1) * sortedHands[i][1];
}
console.log(winnings);
