import { readFileSync } from 'fs';

const expandUniverse = (originalUniverse: string[]): string[] => {
  let expandedRowUniverse: string[] = [];
  // Expand rows by checking each row, then adding an extra when it's empty
  let i = 0;
  while (i < originalUniverse.length) {
    expandedRowUniverse.push(originalUniverse[i]);
    if (!originalUniverse[i].includes('#')) {
      expandedRowUniverse.push(originalUniverse[i]);
    }
    i++;
  }

  // Find empty columns
  let emptyColumnIndices: number[] = []; // Which column indices in originalUniverse have no galaxies?
  let col = 0;
  while (col < originalUniverse[0].length) {
    var columnHasGalaxy = false;
    for (var row = 0; row < originalUniverse.length; row++) {
      if (originalUniverse[row][col] === '#') {
        columnHasGalaxy = true;
        break;
      }
    }

    if (!columnHasGalaxy) {
      emptyColumnIndices.push(col);
    }

    col++;
  }

  let expandedUniverse: string[] = new Array(expandedRowUniverse.length).fill(
    ''
  );
  // For each column with no galaxies, add an extra column
  for (let col = 0; col < expandedRowUniverse[0].length; col++) {
    for (let row = 0; row < expandedRowUniverse.length; row++) {
      expandedUniverse[row] += expandedRowUniverse[row][col];
    }
    if (emptyColumnIndices.includes(col)) {
      for (let row = 0; row < expandedRowUniverse.length; row++) {
        expandedUniverse[row] += expandedRowUniverse[row][col];
      }
    }
  }

  return expandedUniverse;
};

const getGalaxyCoords = (universe: string[]): [number, number][] => {
  const galaxyCoords: [number, number][] = [];
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === '#') {
        galaxyCoords.push([i, j]);
      }
    }
  }
  return galaxyCoords;
};

export const getDistance = (
  coord1: [number, number],
  coord2: [number, number]
): number => {
  return Math.abs(coord2[0] - coord1[0]) + Math.abs(coord2[1] - coord1[1]);
};

const RAW_DATA_BY_LINE: string[] = readFileSync('11-input.txt', 'utf-8').split(
  '\n'
);
const expandedUniverse = expandUniverse(RAW_DATA_BY_LINE);
const allGalaxyCoords = getGalaxyCoords(expandedUniverse);

let totalDistance: number = 0;
for (let i = 0; i < allGalaxyCoords.length; i++) {
  for (let j = i + 1; j < allGalaxyCoords.length; j++) {
    totalDistance += getDistance(allGalaxyCoords[i], allGalaxyCoords[j]);
  }
}
console.log('Part 1:', totalDistance);
