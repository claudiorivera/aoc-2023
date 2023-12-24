import { Card } from "./types";

type CardId = number;
type CardCount = number;

export function solvePart2(rows: Array<string>) {
  const cardCounts = new Map<CardId, CardCount>(
    rows.map(getCardId).map((cardId) => [cardId, 1])
  );

  cardCounts.forEach((cardCount, cardId) => {
    const row = rows[cardId - 1];
    const numberOfWinners = getNumberOfWinnersForRow(row);

    for (let i = 0; i < cardCount; i++) {
      for (let j = 1; j <= numberOfWinners; j++) {
        cardCounts.set(cardId + j, (cardCounts.get(cardId + j) || 0) + 1);
      }
    }
  });

  return [...cardCounts.values()].reduce((total, count) => total + count, 0);
}

function getCardId(row: string) {
  const [cardId] = row.split(":");
  return parseInt(cardId.split("Card ")[1].trim(), 10);
}

function getNumberOfWinnersForRow(row: string) {
  const [_, numbers] = row.split(": ");
  const [winningNumbers, playedNumbers] = numbers.split(" | ");

  return getWinningNumbersForCard({
    playedNumbers: getNumbersForStringValues(playedNumbers),
    winningNumbers: getNumbersForStringValues(winningNumbers),
  }).length;
}

function getNumbersForStringValues(numbers: string) {
  return numbers.split(/\s+/).map((number) => parseInt(number.trim(), 10));
}

function getWinningNumbersForCard(card: Card) {
  return card.playedNumbers.filter((playedNumber) =>
    card.winningNumbers.includes(playedNumber)
  );
}
