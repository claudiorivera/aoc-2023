const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

export function solvePart1(rows: Array<string>) {
  return rows
    .filter(isPossibleGameForRow)
    .map(getGameIdForRow)
    .reduce((acc, cur) => acc + cur, 0);
}

function isPossibleGameForRow(row: string) {
  return getSetsForRow(row).every(isPossibleSet);
}

type Set = {
  red: number;
  green: number;
  blue: number;
};

function getSetsForRow(row: string) {
  return row.split(": ")[1].split("; ").map(getSetForColorValues);
}

function getSetForColorValues(colorValues: string) {
  const colors = colorValues.split(", ");

  const red = getRedValue(colors);
  const green = getGreenValue(colors);
  const blue = getBlueValue(colors);

  return {
    red,
    green,
    blue,
  };
}

const makeGetterForColor =
  (targetColor: string) => (allColors: Array<string>) => {
    const colorString = allColors.find((color) => color.includes(targetColor));
    return colorString ? parseInt(colorString) : 0;
  };

const getRedValue = makeGetterForColor("red");
const getGreenValue = makeGetterForColor("green");
const getBlueValue = makeGetterForColor("blue");

function isPossibleSet(set: Set) {
  return set.red <= MAX_RED && set.green <= MAX_GREEN && set.blue <= MAX_BLUE;
}

function getGameIdForRow(row: string) {
  const match = row.match(/\d*:/);

  if (!match?.length) {
    throw new Error("Could not parse game id");
  }

  return parseInt(match[0]);
}
