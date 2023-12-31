const SEED_MAP_TYPES = {
  SEED_TO_SOIL: "seed-to-soil",
  SOIL_TO_FERTILIZER: "soil-to-fertilizer",
  FERTILIZER_TO_WATER: "fertilizer-to-water",
  WATER_TO_LIGHT: "water-to-light",
  LIGHT_TO_TEMPERATURE: "light-to-temperature",
  TEMPERATURE_TO_HUMIDITY: "temperature-to-humidity",
  HUMIDITY_TO_LOCATION: "humidity-to-location",
} as const;

export const SEED_MAP_KEYS = {
  DESTINATION_RANGE_START: "destinationRangeStart",
  SOURCE_RANGE_START: "sourceRangeStart",
  RANGE_LENGTH: "rangeLength",
} as const;

type SeedMapType = (typeof SEED_MAP_TYPES)[keyof typeof SEED_MAP_TYPES];
type SeedMapKey = (typeof SEED_MAP_KEYS)[keyof typeof SEED_MAP_KEYS];
type SeedMap = Map<SeedMapKey, number>;

export function solvePart1(rows: Array<string>) {
  const seeds = rows[0].split(": ")[1].split(" ").map(Number);

  const map = makeMap(rows.slice(2));

  return seeds
    .map((seed) =>
      Object.values(SEED_MAP_TYPES).reduce((destination, seedMapType) => {
        const seedMap = map.get(seedMapType);

        if (!seedMap) throw new Error("Unreachable");

        return getDestinationFromSource(destination, seedMap);
      }, seed)
    )
    .reduce((min, seedLocation) => {
      return Math.min(min, seedLocation);
    }, Infinity);
}

function makeMap(rows: Array<string>) {
  let currentSeedMapType: SeedMapType;

  return rows.filter(Boolean).reduce((map, currentRow) => {
    if (currentRow.includes(" map:")) {
      currentSeedMapType = currentRow.split(" map:")[0] as SeedMapType;
      map.set(currentSeedMapType, []);
      return map;
    }

    const [destinationRangeStart, sourceRangeStart, rangeLength] = currentRow
      .split(/\s/)
      .map(Number);

    const currentMapKeyMaps = map.get(currentSeedMapType);

    if (!currentMapKeyMaps) throw new Error("Unreachable");

    currentMapKeyMaps.push(
      new Map([
        [SEED_MAP_KEYS.DESTINATION_RANGE_START, destinationRangeStart],
        [SEED_MAP_KEYS.SOURCE_RANGE_START, sourceRangeStart],
        [SEED_MAP_KEYS.RANGE_LENGTH, rangeLength],
      ])
    );

    return map;
  }, new Map<SeedMapType, Array<SeedMap>>());
}

export function getDestinationFromSource(
  source: number,
  sourceToDestinationMaps: Array<SeedMap>
) {
  return sourceToDestinationMaps.reduce(
    (destination, sourceToDestinationMap) => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] =
        sourceToDestinationMap.values();

      if (isBetween(source, sourceRangeStart, sourceRangeStart + rangeLength)) {
        return destination + (destinationRangeStart - sourceRangeStart);
      }

      return destination;
    },
    source
  );
}

function isBetween(number: number, start: number, end: number) {
  return start <= number && number < end;
}
