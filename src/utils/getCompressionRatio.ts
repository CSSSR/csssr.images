import { Dpr, CompressionRatio } from '../types';

export const getCompressionRatio = (pixelRatios: Dpr[]): CompressionRatio => {
  const length = pixelRatios.length;

  return pixelRatios.reduce((acc, item, index) => {
    if (index + 1 === length) {
      acc[item] = 0;
      return acc;
    }

    acc[item] = (index + 1) / length;
    return acc;
  }, {} as CompressionRatio);
};
