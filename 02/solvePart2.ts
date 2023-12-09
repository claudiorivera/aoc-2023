type Set = {
  red: number;
  green: number;
  blue: number;
};

export function solvePart2(rows: Array<string>) {
  return rows.map(getSetPowerForRow).reduce((acc, cur) => acc + cur, 0);
}

function getSetPowerForRow(row: string) {
  const sets = getSetsForRow(row);

  return getRequiredRed(sets) * getRequiredGreen(sets) * getRequiredBlue(sets);
}

const makeGetterForRequiredColor =
  (targetColor: keyof Set) => (sets: Array<Set>) =>
    Math.max(
      ...sets
        .filter((set) => set[targetColor] > 0)
        .map((set) => set[targetColor])
    );

const getRequiredRed = makeGetterForRequiredColor("red");
const getRequiredGreen = makeGetterForRequiredColor("green");
const getRequiredBlue = makeGetterForRequiredColor("blue");

function getSetsForRow(row: string) {
  return row.split(": ")[1].split("; ").map(getSetForValues);
}

function getSetForValues(values: string) {
  const colors = values.split(", ");

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
