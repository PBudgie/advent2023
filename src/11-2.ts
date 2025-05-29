import { readFileSync } from 'fs';
import { getDistance } from './11-1';

const findEmpty = (
  universe: string[]
): { emptyRowIndices: number[]; emptyColumnIndices: number[] } => {
  // Find empty rows
  let emptyRowIndices: number[] = [];
  for (var i = 0; i < universe.length; i++) {
    if (!universe[i].includes('#')) {
      emptyRowIndices.push(i);
    }
  }

  // Find empty columns
  let emptyColumnIndices: number[] = [];
  let col = 0;
  while (col < universe[0].length) {
    var columnHasGalaxy = false;
    for (var row = 0; row < universe.length; row++) {
      if (universe[row][col] === '#') {
        columnHasGalaxy = true;
        break;
      }
    }

    if (!columnHasGalaxy) {
      emptyColumnIndices.push(col);
    }

    col++;
  }

  return { emptyRowIndices, emptyColumnIndices };
};

const EXPANSION_CONSTANT = 1000000;
// Differs from part 1, returns the expanded galaxy coordinates for each galaxy
const getGalaxyCoords = (
  originalUniverse: string[],
  emptyRowIndices: number[],
  emptyColumnIndices: number[]
): [number, number][] => {
  const galaxyCoords: [number, number][] = [];
  for (let i = 0; i < originalUniverse.length; i++) {
    for (let j = 0; j < originalUniverse[i].length; j++) {
      if (originalUniverse[i][j] === '#') {
        // Calculate actual coordinates in the expanded galaxy
        const numEmptyRows = emptyRowIndices.filter(
          (rowIndex) => rowIndex < i
        ).length;
        const numEmptyCols = emptyColumnIndices.filter(
          (colIndex) => colIndex < j
        ).length;
        galaxyCoords.push([
          i + numEmptyRows * (EXPANSION_CONSTANT - 1),
          j + numEmptyCols * (EXPANSION_CONSTANT - 1),
        ]);
      }
    }
  }
  return galaxyCoords;
};

const RAW_DATA_BY_LINE: string[] = readFileSync('11-input.txt', 'utf-8').split(
  '\n'
);
const { emptyRowIndices, emptyColumnIndices } = findEmpty(RAW_DATA_BY_LINE);
const allGalaxyCoords = getGalaxyCoords(
  RAW_DATA_BY_LINE,
  emptyRowIndices,
  emptyColumnIndices
);
let totalDistance: number = 0;
for (let i = 0; i < allGalaxyCoords.length; i++) {
  for (let j = i + 1; j < allGalaxyCoords.length; j++) {
    totalDistance += getDistance(allGalaxyCoords[i], allGalaxyCoords[j]);
  }
}
console.log('Part 2:', totalDistance);
