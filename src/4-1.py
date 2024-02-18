def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip()
    return rawLines
  
input = getInput('4-input.txt')
sum = 0

for i, line in enumerate(input):
  _, allCardsStr = line.split(':')
  winningCardsStr, myCardsStr = allCardsStr.split('|')
  winningCards = winningCardsStr.strip().split(' ')
  myCards = myCardsStr.strip().split(' ')

  winningNums = {int(card) for card in winningCards if len(card) > 0}
  myNums = {int(card) for card in myCards if len(card) > 0}
  numWinning = len(winningNums.intersection(myNums))
  if(numWinning > 0):
    sum += pow(2, numWinning - 1)

print(sum)