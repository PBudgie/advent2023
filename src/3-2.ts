import { readFileSync } from 'fs';

interface PartNumberAndLocation {
  number: number;
  startIndex: number;
  endIndex: number;
  rowNumber: number;
}

interface GearAndLocation {
  row: number;
  col: number;
}

const RAW_DATA_BY_LINE: Array<string> = readFileSync(
  '3-input.txt',
  'utf-8'
).split('\n');
const SCHEMATIC_WIDTH = RAW_DATA_BY_LINE[0].length;
const SCHEMATIC_HEIGHT = RAW_DATA_BY_LINE.length;

const getPartNumbersForLine = (
  input: string,
  rowNumber: number
): Array<PartNumberAndLocation> => {
  let partNumbers: Array<PartNumberAndLocation> = [];
  const regex = /[0-9]+/g;

  var match: RegExpExecArray | null;
  while ((match = regex.exec(input)) != null) {
    const firstIndex = match.index;
    const lastIndex = regex.lastIndex - 1;
    partNumbers.push({
      number: Number(match),
      startIndex: firstIndex,
      endIndex: lastIndex,
      rowNumber,
    });
  }

  return partNumbers;
};

const getGearsForLine = (
  input: string,
  rowNumber: number
): Array<GearAndLocation> => {
  let gears: Array<GearAndLocation> = [];
  const regex = /[*]/g;

  var match: RegExpExecArray | null;
  while ((match = regex.exec(input)) != null) {
    gears.push({
      col: match.index,
      row: rowNumber,
    });
  }

  return gears;
};

const partNumbersAndLocations = RAW_DATA_BY_LINE.map((line, index) => {
  return getPartNumbersForLine(line, index);
}).flat();
const gearsAndLocations = RAW_DATA_BY_LINE.map((line, index) =>
  getGearsForLine(line, index)
).flat();
const products: Array<number> = [];
for (var gear of gearsAndLocations) {
  const adjacentPartNumbers = partNumbersAndLocations.filter(
    (partNumberAndLocation: PartNumberAndLocation) => {
      const partHasCorrectRow =
        gear.row - 1 <= partNumberAndLocation.rowNumber &&
        partNumberAndLocation.rowNumber <= gear.row + 1;

      const partNumberColumns: Array<number> = [];
      for (
        var i = partNumberAndLocation.startIndex;
        i <= partNumberAndLocation.endIndex;
        i++
      ) {
        partNumberColumns.push(i);
      }
      const partHasCorrectCol =
        partNumberColumns.includes(gear.col - 1) ||
        partNumberColumns.includes(gear.col) ||
        partNumberColumns.includes(gear.col + 1);

      return partHasCorrectRow && partHasCorrectCol;
    }
  );
  if (adjacentPartNumbers.length === 2) {
    products.push(
      adjacentPartNumbers[0].number * adjacentPartNumbers[1].number
    );
  }
}
console.log(products.reduce((acc, el) => acc + el, 0));
