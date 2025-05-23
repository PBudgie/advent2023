import { readFileSync } from 'fs';

const RAW_DATA_BY_LINE: string[][] = readFileSync('10-input.txt', 'utf-8')
  .split('\n')
  .map((fullRow) => fullRow.split(''));

const findStartingIndex = (data: string[][]): [number, number] => {
  for (var i = 0; i < data.length; i++) {
    const sIndex = data[i].indexOf('S');
    if (sIndex !== -1) {
      return [i, sIndex]; // row, column
    }
  }
  return [-1, -1];
};

type Edges = 'North' | 'South' | 'East' | 'West';
const PIPE_TO_EDGES: Record<string, Edges[]> = {
  '|': ['North', 'South'],
  '-': ['East', 'West'],
  L: ['North', 'East'],
  J: ['North', 'West'],
  '7': ['South', 'West'],
  F: ['South', 'East'],
  '.': [],
  S: ['North', 'South', 'East', 'West'],
};

const isConnected = (
  coord1: [number, number],
  coord2: [number, number]
): boolean => {
  const coord1Connections =
    PIPE_TO_EDGES[RAW_DATA_BY_LINE[coord1[0]][coord1[1]]];
  const coord2Connections =
    PIPE_TO_EDGES[RAW_DATA_BY_LINE[coord2[0]][coord2[1]]];

  // Second coordinate is directly north of first coordinate
  if (coord1[0] === coord2[0] + 1 && coord1[1] === coord2[1]) {
    return (
      coord1Connections.includes('North') && coord2Connections.includes('South')
    );
  }
  // Second coordinate is directly south of the first coordinate
  else if (coord1[0] === coord2[0] - 1 && coord1[1] === coord2[1]) {
    return (
      coord1Connections.includes('South') && coord2Connections.includes('North')
    );
  }
  // Second coordinate is directly east of first coordinate
  else if (coord1[0] === coord2[0] && coord1[1] - 1 === coord2[1]) {
    return (
      coord1Connections.includes('West') && coord2Connections.includes('East')
    );
  }
  // Second coordinate is directly west of first coordinate
  else if (coord1[0] === coord2[0] && coord1[1] + 1 === coord2[1]) {
    return (
      coord1Connections.includes('East') && coord2Connections.includes('West')
    );
  }
  // Otherwise, coordinate is too far and there is no connection
  return false;
};

const findConnectedNodes = (coord: [number, number]): [number, number][] => {
  const allConnectedNodes: [number, number][] = [];
  const neighborNodesToCheck: [number, number][] = [
    [coord[0] - 1, coord[1]],
    [coord[0], coord[1] - 1],
    [coord[0] + 1, coord[1]],
    [coord[0], coord[1] + 1],
  ];
  for (var neighbor of neighborNodesToCheck) {
    if (isConnected(coord, neighbor)) {
      allConnectedNodes.push(neighbor);
    }
  }
  return allConnectedNodes;
};

// Keeps track of a distances array, mostly for debugging
const distances = [...Array(RAW_DATA_BY_LINE.length)].map(() => [
  ...Array(RAW_DATA_BY_LINE.length),
]);
let distanceCounter = 0;

const visited = new Set<string>();
let pointsToTraverse: Set<[number, number]> = new Set();
pointsToTraverse.add(findStartingIndex(RAW_DATA_BY_LINE));

while (pointsToTraverse.size > 0) {
  let newPointsToTraverse: Set<[number, number]> = new Set();
  pointsToTraverse.forEach((coord) => {
    visited.add(coord.join(','));
    distances[coord[0]][coord[1]] = distanceCounter;
    const newConnectedNodes = findConnectedNodes(coord).filter(
      (connectedCoord) => !visited.has(connectedCoord.join(','))
    );
    newConnectedNodes.forEach((connectedNode) =>
      newPointsToTraverse.add(connectedNode)
    );
  });
  pointsToTraverse = newPointsToTraverse;
  distanceCounter++;
}

console.log(distanceCounter - 1);
