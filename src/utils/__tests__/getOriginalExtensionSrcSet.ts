import { getOriginalExtensionSrcSet } from '../index';

test('Pixel ratios 1x, path "/images/mayImages.png"', () => {
  expect(getOriginalExtensionSrcSet(['1x'], '/images/mayImages.png')).toStrictEqual({
    '1x': '/images/mayImages.png',
  });
});

test('Pixel ratios 1x, 2x, path "/images/mayImages.png"', () => {
  expect(getOriginalExtensionSrcSet(['1x', '2x'], '/images/mayImages.png')).toStrictEqual({
    '1x': '/images/mayImages.png',
    '2x': '/images/mayImages.png',
  });
});

test('Pixel ratios 1x, 2x, 3x, path "/images/mayImages.png"', () => {
  expect(getOriginalExtensionSrcSet(['1x', '2x', '3x'], '/images/mayImages.png')).toStrictEqual({
    '1x': '/images/mayImages.png',
    '2x': '/images/mayImages.png',
    '3x': '/images/mayImages.png',
  });
});
