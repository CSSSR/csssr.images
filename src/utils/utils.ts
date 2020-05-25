import {
  Breakpoint,
  ImageSource,
  ImgproxyResponsiveLoaderResult,
  PictureData,
  SrcSet,
} from '../types';

export const getSrcSetString = (srcSet: SrcSet): string => {
  return Object.entries(srcSet)
    .map(([pixelRatio, url]) => `${url} ${pixelRatio}`)
    .join(', ');
};

export const getBreakpointMedia = (breakpoint: Breakpoint): string => {
  let result = '';
  if (breakpoint.minWidth) {
    result += `(min-width: ${breakpoint.minWidth}px)`;
  }
  if (breakpoint.minWidth && breakpoint.maxWidth) {
    result += ' and ';
  }
  if (breakpoint.maxWidth) {
    result += `(max-width: ${breakpoint.maxWidth}px)`;
  }
  return result;
};

export const getPictureData = (allSources: ImgproxyResponsiveLoaderResult[]): PictureData => {
  // Сортировка sources в порядке списка breakpoints
  allSources.sort((a, b) => a.order - b.order);

  const lastSource = allSources[allSources.length - 1];

  return {
    sources: allSources.map<ImageSource[]>((source) => source.data).flat(),
    fallbackSrcSet: lastSource.data[lastSource.data.length - 1].srcSet,
    fallbackSrc: lastSource.fallbackSrc,
  };
};
