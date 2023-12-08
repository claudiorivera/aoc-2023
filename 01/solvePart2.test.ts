import { expect, it } from "bun:test";
import { solvePart2 } from "./solvePart2";

it("should solve part 2 correctly", () => {
  const rows = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
  ];

  expect(solvePart2(rows)).toEqual(281);
});
