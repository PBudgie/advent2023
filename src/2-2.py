def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip()
    return rawLines

input = getInput('2-input.txt')
sum = 0

for game in input:
  split = game.split(':')
  gameId = int(split[0][5:])
  pulls = split[1].split(';')
  minDiceForGame = {'red': 0, 'green': 0, 'blue': 0}

  for pull in pulls:
    for dice in pull.split(','):
      if 'blue' in dice:
        numBlue = int(dice[:len(dice) - 5].strip())
        if minDiceForGame['blue'] < numBlue:
          minDiceForGame['blue'] = numBlue
      elif 'red' in dice:
        numRed = int(dice[:len(dice) - 4].strip())
        if minDiceForGame['red'] < numRed:
          minDiceForGame['red'] = numRed
      else:
        numGreen = int(dice[:len(dice) - 6].strip())
        if minDiceForGame['green'] < numGreen:
          minDiceForGame['green'] = numGreen

  sum += minDiceForGame['blue'] * minDiceForGame['green'] * minDiceForGame['red']

print(sum)