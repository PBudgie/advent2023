def getInput(filename):
  with open(filename) as inputFile:
    rawLines = inputFile.readlines()
    for i, line in enumerate(rawLines):
      rawLines[i] = rawLines[i].strip()
    return rawLines

ELFS_BAG = {
  "red": 12,
  "green": 13,
  "blue": 14
}

input = getInput('2-input.txt')
sum = 0

for game in input:
  possible = True
  split = game.split(':')
  gameId = int(split[0][5:])
  pulls = split[1].split(';')

  # Check if each pull of dice is possible given the elf's bag
  for pull in pulls:
    diceInPull = {'red': 0, 'green': 0, 'blue': 0}
    for dice in pull.split(','):
      if 'blue' in dice:
        numBlue = int(dice[:len(dice) - 5].strip())
        diceInPull['blue'] = numBlue
      elif 'red' in dice:
        numRed = int(dice[:len(dice) - 4].strip())
        diceInPull['red'] = numRed
      else:
        numGreen = int(dice[:len(dice) - 6].strip())
        diceInPull['green'] = numGreen
      if diceInPull['blue'] > ELFS_BAG['blue'] or diceInPull['green'] > ELFS_BAG['green'] or diceInPull['red'] > ELFS_BAG['red']:
        possible = False

  if (possible):
    sum += gameId

print(sum)