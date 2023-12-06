import { readFileSync } from 'fs';
import { isPartNumber } from './3-1';

const RAW_DATA_BY_LINE: Array<string> = readFileSync(
  '3-example.txt',
  'utf-8'
).split('\n');
const SCHEMATIC_WIDTH = RAW_DATA_BY_LINE[0].length;
const SCHEMATIC_HEIGHT = RAW_DATA_BY_LINE.length;

const getPartNumbersForLine = (input: string, rowNumber: number) => {
  let partNumbers: Array<object> = [];
  const regex = /[0-9]+/g;

  var match: RegExpExecArray | null;
  while ((match = regex.exec(input)) != null) {
    const firstIndex = match.index;
    const lastIndex = regex.lastIndex - 1;
    if (isPartNumber(firstIndex, lastIndex, rowNumber)) {
      partNumbers.push({
        number: Number(match),
        startIndex: firstIndex,
        endIndex: lastIndex,
        rowNumber,
      });
    }
  }

  return partNumbers;
};

const partNumbersAndLocations = RAW_DATA_BY_LINE.map((line, index) => {
  return getPartNumbersForLine(line, index);
});
console.log(partNumbersAndLocations);
