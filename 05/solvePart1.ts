export function solvePart1(rows: Array<string>) {
  const seeds = rows[0].split(":")[1].split(" ").filter(Boolean).map(Number);

  let currentMapKey: string;

  const map = rows
    .slice(2)
    .filter(Boolean)
    .reduce((map, currentRow) => {
      if (currentRow.includes(" map:")) {
        [currentMapKey] = currentRow.split(" map:");
        map.set(currentMapKey, []);
        return map;
      }

      const [destinationRangeStart, sourceRangeStart, rangeLength] = currentRow
        .split(/\s/)
        .map(Number);

      const currentMapKeyMaps = map.get(currentMapKey);

      if (currentMapKeyMaps) {
        currentMapKeyMaps.push(
          new Map([
            ["destinationRangeStart", destinationRangeStart],
            ["sourceRangeStart", sourceRangeStart],
            ["rangeLength", rangeLength],
          ])
        );
      }

      return map;
    }, new Map<string, Array<Map<"destinationRangeStart" | "sourceRangeStart" | "rangeLength", number>>>());

  console.log({ map });

  return 0;
}
