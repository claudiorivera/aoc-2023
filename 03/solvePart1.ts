import { Part } from "./types";

export function solvePart1(rows: Array<string>) {
  return rows
    .flatMap(getPartCandidatesForRow)
    .filter((partCandidate: Part) => isValidPart(partCandidate, rows))
    .map((part) => part.value)
    .reduce((total, currentValue) => total + currentValue, 0);
}

function getPartCandidatesForRow(row: string, rowIndex: number) {
  return Array.from(row.matchAll(/(\d+)/g)).map<Part>((match) => {
    const value = match[0];
    const columnStart = match.index!; // https://github.com/microsoft/TypeScript/issues/36788

    return {
      value: parseInt(value),
      rowIndex,
      columnStart: columnStart,
      columnEnd: columnStart + value.length - 1,
    };
  });
}

function hasAdjacentSymbol(
  { columnStart, columnEnd, rowIndex }: Part,
  rows: Array<string>
) {
  const searchColumnStart = Math.max(columnStart - 1, 0);
  const searchColumnEnd = Math.min(columnEnd + 1, rows[rowIndex].length - 1);
  const searchRowStart = Math.max(rowIndex - 1, 0);
  const searchRowEnd = Math.min(rowIndex + 1, rows.length - 1);

  for (let row = searchRowStart; row <= searchRowEnd; row++) {
    for (let column = searchColumnStart; column <= searchColumnEnd; column++) {
      if (/[^\d\.]/.test(rows[row][column])) {
        return true;
      }
    }
  }

  return false;
}

function isValidPart(partCandidate: Part, rows: Array<string>) {
  return hasAdjacentSymbol(partCandidate, rows);
}
