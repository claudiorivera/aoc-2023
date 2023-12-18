import { Gear, Part } from "./types";

export function solvePart2(rows: Array<string>) {
  return getGearRatios(rows).reduce((acc, cur) => acc + cur, 0);
}

function getGearCandidatesForRow(row: string, rowIndex: number) {
  return Array.from(row.matchAll(/(\*)/g)).map<Gear>((match) => ({
    rowIndex,
    columnIndex: match.index!, // https://github.com/microsoft/TypeScript/issues/36788,
  }));
}

function getGearRatio(gear: Gear, rows: Array<string>) {
  const parts = rows
    .flatMap(getPartCandidatesForRow)
    .filter((part) => isPartAdjacentToGear({ part, gear }));

  const result = parts.length === 2 ? parts[0].value * parts[1].value : 0;

  return result;
}

function getGearRatios(rows: Array<string>) {
  return rows
    .flatMap(getGearCandidatesForRow)
    .filter((gearCandidate) => {
      const result = isGear(gearCandidate, rows);

      return result;
    })
    .map((gear) => {
      return getGearRatio(gear, rows);
    });
}

function getNeighboringRowsForRowIndex(rowIndex: number, rows: Array<string>) {
  const rowIndexes = new Set([
    Math.max(0, rowIndex - 1),
    rowIndex,
    Math.min(rowIndex + 1, rows.length - 1),
  ]);

  return [...rowIndexes].map((rowIndex) => rows[rowIndex]);
}

function isGear(gearCandidate: Gear, rows: Array<string>) {
  const parts = rows
    .flatMap(getPartCandidatesForRow)
    .filter((part) => isPartAdjacentToGear({ part, gear: gearCandidate }));

  return parts.length === 2;
}

function isInRange(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

function isPartAdjacentToGear({ part, gear }: { part: Part; gear: Gear }) {
  const partEndIsWithinGearColumnSearchRange = isInRange(
    part.columnEnd,
    gear.columnIndex - 1,
    gear.columnIndex + 1
  );
  const partStartIsWithinGearColumnSearchRange = isInRange(
    part.columnStart,
    gear.columnIndex - 1,
    gear.columnIndex + 1
  );
  const partRowIsWithinGearRowSearchRange = isInRange(
    part.rowIndex,
    gear.rowIndex - 1,
    gear.rowIndex + 1
  );

  return (
    partRowIsWithinGearRowSearchRange &&
    (partEndIsWithinGearColumnSearchRange ||
      partStartIsWithinGearColumnSearchRange)
  );
}

function getPartCandidatesForRow(row: string, rowIndex: number) {
  return Array.from(row.matchAll(/(\d+)/g)).map<Part>((match) => {
    const value = match[0];
    const columnStart = match.index!; // https://github.com/microsoft/TypeScript/issues/36788

    const partCandidate = {
      value: parseInt(value),
      rowIndex,
      columnStart: columnStart,
      columnEnd: columnStart + value.length - 1,
    };

    return partCandidate;
  });
}
