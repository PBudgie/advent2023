import re

tokenToValue = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
};
validTokens = tokenToValue.keys();

def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip()
    return rawLines
  
input = getInput('1-input.txt')
regex = re.compile('|'.join(validTokens), re.M)
sum = 0

for i, line in enumerate(input):
  firstDigitMatch = re.search(regex, line).group()
  firstDigitNum = tokenToValue[firstDigitMatch]

  secondDigitNum = None
  for j in range(len(line) - 1, -1, -1):
    secondDigitMatch = re.search(regex, line[j:])
    if (secondDigitMatch is not None and secondDigitNum is None):
      secondDigitNum = tokenToValue[secondDigitMatch.group()]

  calibrationValue = firstDigitNum * 10 + secondDigitNum
  sum += calibrationValue

print(sum)