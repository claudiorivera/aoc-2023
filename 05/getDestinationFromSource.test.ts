import { expect, it } from "bun:test";
import { SEED_MAP_KEYS, getDestinationFromSource } from "./solvePart1";

it("should return soil from seed", () => {
	const seedToSoilMaps = [
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 50],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 98],
			[SEED_MAP_KEYS.RANGE_LENGTH, 2],
		]),
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 52],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 50],
			[SEED_MAP_KEYS.RANGE_LENGTH, 48],
		]),
	];

	expect(getDestinationFromSource(79, seedToSoilMaps)).toEqual(81);
	expect(getDestinationFromSource(14, seedToSoilMaps)).toEqual(14);
	expect(getDestinationFromSource(55, seedToSoilMaps)).toEqual(57);
	expect(getDestinationFromSource(13, seedToSoilMaps)).toEqual(13);
});

it("should return fertilizer from soil", () => {
	const soilToFertilizerMaps = [
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 0],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 15],
			[SEED_MAP_KEYS.RANGE_LENGTH, 37],
		]),
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 37],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 52],
			[SEED_MAP_KEYS.RANGE_LENGTH, 2],
		]),
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 39],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 0],
			[SEED_MAP_KEYS.RANGE_LENGTH, 15],
		]),
	];

	expect(getDestinationFromSource(81, soilToFertilizerMaps)).toEqual(81);
	expect(getDestinationFromSource(14, soilToFertilizerMaps)).toEqual(53);
	expect(getDestinationFromSource(57, soilToFertilizerMaps)).toEqual(57);
	expect(getDestinationFromSource(13, soilToFertilizerMaps)).toEqual(52);
});

it("should return water from fertilizer", () => {
	const fertilizerToWaterMaps = [
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 49],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 53],
			[SEED_MAP_KEYS.RANGE_LENGTH, 8],
		]),
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 0],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 11],
			[SEED_MAP_KEYS.RANGE_LENGTH, 42],
		]),
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 42],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 0],
			[SEED_MAP_KEYS.RANGE_LENGTH, 7],
		]),
		new Map([
			[SEED_MAP_KEYS.DESTINATION_RANGE_START, 57],
			[SEED_MAP_KEYS.SOURCE_RANGE_START, 7],
			[SEED_MAP_KEYS.RANGE_LENGTH, 4],
		]),
	];

	expect(getDestinationFromSource(81, fertilizerToWaterMaps)).toEqual(81);
	expect(getDestinationFromSource(53, fertilizerToWaterMaps)).toEqual(49);
	expect(getDestinationFromSource(57, fertilizerToWaterMaps)).toEqual(53);
	expect(getDestinationFromSource(52, fertilizerToWaterMaps)).toEqual(41);
});
