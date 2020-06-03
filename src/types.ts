export type Dpr = '1x' | '2x' | '3x';

export type SrcSet = {
  [dpr in Dpr]: string;
};

export type ExtensionSrcSet = {
  extension: string;
  srcSet: SrcSet;
};

export type BreakpointSource = {
  breakpointMedia: string | null;
  srcSets: ExtensionSrcSet[];
};

export type OrderedBreakpointSource = {
  order: number;
} & BreakpointSource;

export type BreakpointBoundaries = {
  minWidth?: number;
  maxWidth?: number;
};

export type Breakpoint = {
  name: string;
} & BreakpointBoundaries;
