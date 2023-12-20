import { readFileSync } from 'fs';

interface Node {
  id: string;
  left: Node | null;
  right: Node | null;
}

const RAW_DATA_BY_LINE: Array<string> = readFileSync(
  '8-input.txt',
  'utf-8'
).split('\n');
const INSTRUCTION: string = RAW_DATA_BY_LINE[0];
const RAW_NODE_DATA = RAW_DATA_BY_LINE.slice(2);
const ALL_NODES: Array<Node> = RAW_NODE_DATA.map((rawNode) => {
  const nodeId = rawNode.split('=')[0].trim();
  return { id: nodeId, left: null, right: null };
});

// Populates left/right with the correct node
RAW_NODE_DATA.forEach((rawNode) => {
  const currentNodeId: string = rawNode.split('=')[0].trim();
  const [leftNodeId, rightNodeId] = rawNode
    .split('=')[1]
    .trim()
    .split(',')
    .map((nodeStr) => {
      return nodeStr
        .split('')
        .filter((char) => char.match(/^[A-Z]$/))
        .join('');
    });
  var currentNode: Node = ALL_NODES.filter(
    (node) => node.id === currentNodeId
  )[0];
  const leftNode = ALL_NODES.filter((node) => node.id === leftNodeId)[0];
  const rightNode = ALL_NODES.filter((node) => node.id === rightNodeId)[0];
  currentNode.left = leftNode;
  currentNode.right = rightNode;
});

// Executes instructions until we find the desired node
var steps = 0;
var currentNode = ALL_NODES.filter((node) => node.id === 'AAA')[0];
while (currentNode.id !== 'ZZZ') {
  const currentInstruction = INSTRUCTION.charAt(steps % INSTRUCTION.length);
  if (currentInstruction === 'L' && currentNode.left !== null) {
    currentNode = currentNode.left;
  } else if (currentInstruction === 'R' && currentNode.right !== null) {
    currentNode = currentNode.right;
  } else {
    console.error("shouldn't get here");
  }
  steps++;
}
console.log(steps);
