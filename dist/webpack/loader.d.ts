import webpack from 'webpack';
import { Breakpoint, SrcSet } from '../types';
export declare const getSrcSetString: (srcSet: SrcSet) => string;
export declare const getBreakpointMedia: (breakpoint: Breakpoint) => string;
export default function (this: webpack.loader.LoaderContext, source: string): string;
