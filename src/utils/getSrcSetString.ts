import { SrcSet } from '../types';

export const getSrcSetString = (srcSet: SrcSet): string => {
  return Object.entries(srcSet)
    .map(([pixelRatio, url]) => `${url} ${pixelRatio}`)
    .join(', ');
};
