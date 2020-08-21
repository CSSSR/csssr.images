import { BreakpointSource } from '../types';

export const getOriginal = (source: BreakpointSource): string | undefined => {
  const srcSet = source.srcSets[source.srcSets.length - 1].srcSet;

  return srcSet['3x'] || srcSet['2x'] || srcSet['1x'];
};
