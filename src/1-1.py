def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip()
    return rawLines

inputList = getInput('1-input.txt')
sum = 0
for i, value in enumerate(inputList):
  digitsInLine = [char for char in value if char.isdigit()]
  calibrationValue = int(digitsInLine[0] + digitsInLine[len(digitsInLine) - 1])
  sum += calibrationValue
print(sum)
