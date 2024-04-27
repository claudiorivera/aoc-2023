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

type Range = {
	rangeStart: number;
	rangeEnd: number;
};

export function solvePart2(rows: Array<string>) {
	const ranges = rows[0]
		.split(": ")[1]
		.split(" ")
		.map(Number)
		.reduce<Array<Range>>((ranges, currentNumber, index, allNumbers) => {
			if (index % 2 === 0) {
				ranges.push({
					rangeStart: currentNumber,
					rangeEnd: currentNumber + allNumbers[index + 1] - 1,
				});
			}

			return ranges;
		}, [])
		.sort((a, b) => a.rangeStart - b.rangeStart);

	const map = makeMap(rows.slice(2));

	console.log({ ranges, map });

	const seeds = new Set<number>();

	for (const range of ranges) {
		for (let i = range.rangeStart; i <= range.rangeEnd; i++) {
			seeds.add(i);
		}
	}

	return [...seeds]
		.map((seed) =>
			Object.values(SEED_MAP_TYPES).reduce((destination, seedMapType) => {
				const seedMap = map.get(seedMapType);

				if (!seedMap) throw new Error("Unreachable");

				return getDestinationFromSource(destination, seedMap);
			}, seed),
		)
		.reduce((min, seedLocation) => {
			return Math.min(min, seedLocation);
		}, Number.POSITIVE_INFINITY);
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

		if (currentMapKeyMaps) {
			currentMapKeyMaps.push(
				new Map([
					[SEED_MAP_KEYS.DESTINATION_RANGE_START, destinationRangeStart],
					[SEED_MAP_KEYS.SOURCE_RANGE_START, sourceRangeStart],
					[SEED_MAP_KEYS.RANGE_LENGTH, rangeLength],
				]),
			);
		}

		return map;
	}, new Map<SeedMapType, Array<SeedMap>>());
}

export function getDestinationFromSource(source: number, maps: Array<SeedMap>) {
	return maps.reduce((destination, map) => {
		const [destinationRangeStart, sourceRangeStart, rangeLength] = map.values();

		if (isBetween(source, sourceRangeStart, sourceRangeStart + rangeLength)) {
			return destination + (destinationRangeStart - sourceRangeStart);
		}

		return destination;
	}, source);
}

function isBetween(number: number, start: number, end: number) {
	return start <= number && number < end;
}
