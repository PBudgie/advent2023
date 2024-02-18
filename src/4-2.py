def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip()
    return rawLines
  
def getWinsByCardId(rawInput):
  winsByCardId = {}
  for i, line in enumerate(rawInput):
    cardIdStr, allCardsStr = line.split(':')
    cardId = int(cardIdStr[5:])
    winningCardsStr, myCardsStr = allCardsStr.split('|')
    winningCards = winningCardsStr.strip().split(' ')
    myCards = myCardsStr.strip().split(' ')

    winningNums = {int(card) for card in winningCards if len(card) > 0}
    myNums = {int(card) for card in myCards if len(card) > 0}
    numWinning = len(winningNums.intersection(myNums))
    winsByCardId[cardId] = numWinning
  return winsByCardId
  
input = getInput('4-input.txt')
winsByCardId = getWinsByCardId(input)
ownedCards = {}

# Start with one of each card
for i in range(1,len(input) + 1):
  ownedCards[i] = 1

# Get cards won by id
for i in range(1,len(input) + 1):
  numWonByThisCard = winsByCardId[i]
  numCopiesOfThisCard = ownedCards[i]
  for j in range(i+1, i+1+numWonByThisCard):
    ownedCards[j] = ownedCards[j] + numCopiesOfThisCard

# Sum up how many cards there are
totalNumOfCards = 0
for id, num in ownedCards.items():
  totalNumOfCards += num
print(totalNumOfCards)