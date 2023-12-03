const file = Bun.file("./01_input.txt");
const text = await file.text();

const rows = text.split("\n");

function main() {
  const calibrationValues: number[] = [];

  rows.forEach((row) => calibrationValues.push(getCalibrationValueForRow(row)));

  console.log(calibrationValues.reduce((acc, cur) => acc + cur, 0));
}

function getCalibrationValueForRow(row: string) {
  const firstDigit = getFirstDigit(row);
  const lastDigit = getLastDigit(row);

  return parseInt(`${firstDigit}${lastDigit}`);
}

function getFirstDigit(input: string) {
  for (const value of input) {
    if (parseInt(value)) return parseInt(value);
  }
}

function getLastDigit(input: string) {
  for (let i = input.length - 1; i >= 0; i--) {
    if (parseInt(input[i])) return parseInt(input[i]);
  }
}

main();
