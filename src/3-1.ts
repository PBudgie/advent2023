import { readFileSync } from 'fs';

const RAW_DATA_BY_LINE: Array<string> = readFileSync(
  '3-input.txt',
  'utf-8'
).split('\n');
const SCHEMATIC_WIDTH = RAW_DATA_BY_LINE[0].length;
const SCHEMATIC_HEIGHT = RAW_DATA_BY_LINE.length;

export const isPartNumber = (
  startIndex: number,
  endIndex: number,
  rowNumber: number
): boolean => {
  const isSymbol = (char: string): boolean => {
    // Is not a number and not a period
    return char !== '.' && isNaN(Number(char));
  };

  // Left
  if (
    startIndex - 1 >= 0 &&
    isSymbol(RAW_DATA_BY_LINE[rowNumber].slice(startIndex - 1, startIndex))
  ) {
    return true;
  }

  // Right
  if (
    endIndex + 1 <= SCHEMATIC_WIDTH &&
    isSymbol(RAW_DATA_BY_LINE[rowNumber].slice(endIndex + 1, endIndex + 2))
  ) {
    return true;
  }

  // Row above
  if (rowNumber - 1 >= 0) {
    for (
      var col = Math.max(0, startIndex - 1);
      col <= Math.min(SCHEMATIC_WIDTH, endIndex + 1);
      col++
    ) {
      if (isSymbol(RAW_DATA_BY_LINE[rowNumber - 1].slice(col, col + 1))) {
        return true;
      }
    }
  }

  // Row below
  if (rowNumber + 1 < SCHEMATIC_HEIGHT) {
    for (
      var col = Math.max(0, startIndex - 1);
      col <= Math.min(SCHEMATIC_WIDTH, endIndex + 1);
      col++
    ) {
      if (isSymbol(RAW_DATA_BY_LINE[rowNumber + 1].slice(col, col + 1))) {
        return true;
      }
    }
  }

  // We didn't find a symbol
  return false;
};

const getPartNumbers = (input: string, rowNumber: number) => {
  let partNumbers: Array<number> = [];
  const regex = /[0-9]+/g;

  var match: RegExpExecArray | null;
  while ((match = regex.exec(input)) != null) {
    const firstIndex = match.index;
    const lastIndex = regex.lastIndex - 1;
    if (isPartNumber(firstIndex, lastIndex, rowNumber)) {
      partNumbers.push(Number(match));
    }
  }

  return partNumbers;
};

const partNumbersByLine = RAW_DATA_BY_LINE.map((line, index) =>
  getPartNumbers(line, index)
);
const allPartNumbers = partNumbersByLine.flat();
console.log(
  'Part 1:',
  allPartNumbers.reduce((acc, el) => acc + el, 0)
);
