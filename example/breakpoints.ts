import { Breakpoint } from '../src/types';

const breakpointsInPixels = {
  xs: 360,
  s: 768,
  m: 1024,
  l: 1280,
  xl: 1360,
  xxl: 1920,
};

const allBreakpointsInPixels = {
  ...breakpointsInPixels,
  s_s: breakpointsInPixels.s - 1,
  s_m: breakpointsInPixels.m - 1,
  s_l: breakpointsInPixels.l - 1,
  s_xl: breakpointsInPixels.xl - 1,
  s_xxl: breakpointsInPixels.xxl - 1,
};

export const breakpoints: Breakpoint[] = [
  {
    name: 'mobile.all',
    maxWidth: allBreakpointsInPixels.s_s,
  },
  {
    name: 'tablet.s',
    minWidth: allBreakpointsInPixels.s,
    maxWidth: allBreakpointsInPixels.s_m,
  },
  {
    name: 'tablet.m',
    minWidth: allBreakpointsInPixels.m,
    maxWidth: allBreakpointsInPixels.s_l,
  },
  {
    name: 'tablet.all',
    minWidth: allBreakpointsInPixels.s,
    maxWidth: allBreakpointsInPixels.s_l,
  },
  {
    name: 'desktop.s',
    minWidth: allBreakpointsInPixels.l,
    maxWidth: allBreakpointsInPixels.s_xl,
  },
  {
    name: 'desktop.m',
    minWidth: allBreakpointsInPixels.xl,
    maxWidth: allBreakpointsInPixels.s_xxl,
  },
  {
    name: 'desktop.l',
    minWidth: allBreakpointsInPixels.xxl,
  },
  {
    name: 'desktop.all',
    minWidth: allBreakpointsInPixels.l,
  },
];
