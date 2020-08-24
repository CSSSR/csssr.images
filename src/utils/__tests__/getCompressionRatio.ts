import { getCompressionRatio } from '../index';


test('Pixel ratios 1x', () => {
  expect(
    getCompressionRatio(['1x']),
  ).toStrictEqual({"1x": 0});
});

test('Pixel ratios 1x, 2x', () => {
  expect(
    getCompressionRatio(['1x','2x']),
  ).toStrictEqual({"1x": 0.5, "2x": 0});
});

test('Pixel ratios 1x, 2x, 3x', () => {
  expect(
    getCompressionRatio(['1x','2x', '3x']),
  ).toStrictEqual({"1x": 0.3333333333333333, "2x": 0.6666666666666666, "3x": 0});
});
