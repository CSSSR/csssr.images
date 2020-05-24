export type PixelRatio = '1x' | '2x' | '3x';

export type SrcSet = {
  [pixelRatio in PixelRatio]: string;
};

export type ImageSource = {
  breakpointName: string;
  breakpointMedia: string;
  extension: string;
  srcSet: string;
};

export type ImgproxyResponsiveLoaderResult = {
  order: number;
  data: ImageSource[];
  fallbackSrc: string;
};

export type Breakpoint = { name: string; minWidth?: number; maxWidth?: number };
