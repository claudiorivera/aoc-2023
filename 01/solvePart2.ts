export function solvePart2(rows: Array<string>) {
  const calibrationValues = rows.map((row) => getCalibrationValueForRow(row));

  return calibrationValues.reduce((acc, cur) => acc + cur, 0);
}

function getCalibrationValueForRow(row: string) {
  const allDigits = getAllDigits(row);
  const firstDigit = allDigits.at(0);
  const lastDigit = allDigits.at(-1);

  return parseInt(`${firstDigit}${lastDigit}`);
}

const NUMBERS = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

function getAllDigits(input: string) {
  const allDigitsRegex =
    /\d|(?=(zero|one|two|three|four|five|six|seven|eight|nine))/g;

  return Array.from(input.matchAll(allDigitsRegex)).map((match) =>
    !!match.at(0) ? match.at(0) : NUMBERS[match.at(1) as keyof typeof NUMBERS]
  );
}
