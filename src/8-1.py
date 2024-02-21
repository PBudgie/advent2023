class Node:
  def __init__(self, id):
    self.id = id
  
  def setChildren(self, left, right):
    self.left = left
    self.right = right

def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip()
    return rawLines

input = getInput('8-input.txt')
instruction = input[0]
nodes = input[2:]

# Create all nodes
nodeDict = {}
for node in nodes:
  nodeId = node.split(" = ")[0]
  nodeDict[nodeId] = Node(nodeId)

# Create tree by correctly setting children
for node in nodes:
  currentNodeId, childrenNodeStr = node.split(" = ")
  leftChildId, rightChildId = childrenNodeStr[1:-1].split(", ")
  currentNode = nodeDict[currentNodeId]
  leftChild = nodeDict[leftChildId]
  rightChild = nodeDict[rightChildId]
  currentNode.setChildren(leftChild, rightChild)

# Find steps to ZZZ
steps = 0
currentNode = nodeDict['AAA']
while currentNode.id != 'ZZZ':
  currentInstruction = instruction[steps % len(instruction)]
  if currentInstruction == 'L':
    currentNode = currentNode.left
  else:
    currentNode = currentNode.right
  steps += 1

print(steps)