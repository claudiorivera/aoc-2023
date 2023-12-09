import { solvePart1 } from "./solvePart1";

const fileName = Bun.argv[2];
const file = Bun.file(fileName);
const text = await file.text();

const rows = text.split("\n");

function main() {
  return console.log({ part1: solvePart1(rows) });
}

main();
