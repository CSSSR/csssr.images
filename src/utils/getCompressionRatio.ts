import { Dpr, CompressionRatio } from '../types';

export const getCompressionRatio = (pixelRatios: Dpr[]): CompressionRatio => {
  const length = pixelRatios.length;

  return pixelRatios.reduce((acc, item, index) => {
    if (index + 1 === length) {
      acc[item] = 0;
      return acc;
    }

    acc[item] = Number(((index + 1) / length).toFixed(5));
    return acc;
  }, {} as CompressionRatio);
};
