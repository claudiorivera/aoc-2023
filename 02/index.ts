import { solvePart1 } from "./solvePart1";
import { solvePart2 } from "./solvePart2";

const fileName = Bun.argv[2];
const file = Bun.file(fileName);
const text = await file.text();

const rows = text.split("\n");

function main() {
  return console.log({ part1: solvePart1(rows), part2: solvePart2(rows) });
}

main();
