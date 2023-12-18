import { expect, it } from "bun:test";
import { solvePart2 } from "./solvePart2";

it("should solve part 2 correctly", () => {
  const rows = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];

  expect(solvePart2(rows)).toEqual(467835);
});
