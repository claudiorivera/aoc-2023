import { expect, it } from "bun:test";
import { solvePart1 } from "./solvePart1";

it("should solve part 1 correctly", () => {
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

  expect(solvePart1(rows)).toEqual(4361);
});
