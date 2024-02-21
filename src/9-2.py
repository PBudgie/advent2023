def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip().split(' ')
      rawLines[i] = [int(item) for item in rawLines[i]]
    return rawLines
  
def getExtrapolatedFirstValue(sequence):
  firstDerivatives = []
  currentDerivatives = list(sequence)
  containsNonZero = any([True if number != 0 else False for number in currentDerivatives])

  while containsNonZero:
    firstDerivatives.append(currentDerivatives[0])
    currentDerivatives = [currentDerivatives[i+1] - currentDerivatives[i] for i in range(len(currentDerivatives) - 1)]
    containsNonZero = any([True if number != 0 else False for number in currentDerivatives])

  return sum(firstDerivatives[0::2]) - sum(firstDerivatives[1::2])


input = getInput('9-input.txt')
extrapolatedValueSum = 0
for line in input:
  extrapolatedValue = getExtrapolatedFirstValue(line)
  extrapolatedValueSum += extrapolatedValue
print('Final sum', extrapolatedValueSum)