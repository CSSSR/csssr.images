export type Dpr = '1x' | '2x' | '3x';

// TODO поправить этот тип
// export type SrcSet = {
//   '1x': string;
// } | {
//   '1x': string;
//   '2x': string;
// } | {
//   '1x': string;
//   '2x': string;
//   '3x': string;
// };
export type SrcSet = {
  '1x': string;
  '2x'?: string;
  '3x'?: string;
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
