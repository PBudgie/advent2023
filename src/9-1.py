def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip().split(' ')
      rawLines[i] = [int(item) for item in rawLines[i]]
    return rawLines
  
def getExtrapolatedValue(sequence):
  lastDerivatives = []
  currentDerivatives = list(sequence)
  containsNonZero = any([True if number != 0 else False for number in currentDerivatives])

  while containsNonZero:
    lastDerivatives.append(currentDerivatives[-1])
    currentDerivatives = [currentDerivatives[i+1] - currentDerivatives[i] for i in range(len(currentDerivatives) - 1)]
    containsNonZero = any([True if number != 0 else False for number in currentDerivatives])

  return sum(lastDerivatives)


input = getInput('9-input.txt')
extrapolatedValueSum = 0
for line in input:
  extrapolatedValue = getExtrapolatedValue(line)
  extrapolatedValueSum += extrapolatedValue
print('Final sum', extrapolatedValueSum)