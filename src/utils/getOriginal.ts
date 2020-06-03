import { BreakpointSource } from '../types';

export const getOriginal = (source: BreakpointSource): string =>
  source.srcSets[source.srcSets.length - 1].srcSet['3x'];
