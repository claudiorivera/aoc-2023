import { solvePart1 } from "./solvePart1";

const fileName = Bun.argv[2];
const file = Bun.file(fileName);
const text = await file.text();

const rows = text.split("\n");

function main() {
  console.log(solvePart1(rows));
}

main();
