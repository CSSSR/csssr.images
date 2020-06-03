import { BreakpointBoundaries } from '../types';

export const getBreakpointMedia = (breakpointBoundaries: BreakpointBoundaries): string => {
  let result = '';
  if (breakpointBoundaries.minWidth) {
    result += `(min-width: ${breakpointBoundaries.minWidth}px)`;
  }
  if (breakpointBoundaries.minWidth && breakpointBoundaries.maxWidth) {
    result += ' and ';
  }
  if (breakpointBoundaries.maxWidth) {
    result += `(max-width: ${breakpointBoundaries.maxWidth}px)`;
  }
  return result;
};
