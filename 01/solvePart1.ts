export function solvePart1(rows: Array<string>) {
  return rows
    .map((row) => getCalibrationValueForRow(row))
    .reduce((acc, cur) => acc + cur, 0);
}

function getCalibrationValueForRow(row: string) {
  const allDigits = getAllDigits(row);
  const firstDigit = allDigits.at(0);
  const lastDigit = allDigits.at(-1);

  return parseInt(`${firstDigit}${lastDigit}`);
}

function getAllDigits(input: string) {
  const allDigitsRegex = /\d/g;

  return Array.from(input.matchAll(allDigitsRegex));
}
