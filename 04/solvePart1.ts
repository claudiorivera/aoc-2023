import { Card } from "./types";

export function solvePart1(rows: Array<string>) {
  return rows.map(getPointsForRow).reduce((total, points) => total + points, 0);
}

function getPointsForRow(row: string) {
  const [_, numbers] = row.split(":");
  const [winningNumbers, playedNumbers] = numbers.split(" | ");

  return getPointsForCard({
    playedNumbers: getNumbersForStringValues(playedNumbers),
    winningNumbers: getNumbersForStringValues(winningNumbers),
  });
}

function getNumbersForStringValues(numbers: string) {
  return numbers.split(/\s+/).map((number) => parseInt(number.trim(), 10));
}

function getPointsForCard(card: Card) {
  const commonNumbers = card.playedNumbers.filter((playedNumber) =>
    card.winningNumbers.includes(playedNumber)
  );

  if (!!commonNumbers.length) {
    return Math.pow(2, commonNumbers.length - 1);
  }

  return 0;
}
