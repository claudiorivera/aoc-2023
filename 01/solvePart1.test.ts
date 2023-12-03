import { describe, expect, it } from "bun:test";
import { solvePart1 } from "./solvePart1";

describe("solvePart1", () => {
  it("should solve part 1 correctly", () => {
    const rows = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

    expect(solvePart1(rows)).toEqual(142);
  });
});
