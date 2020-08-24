import { ExtensionSrcSet, OrderedBreakpointSource, BreakpointSource, Dpr } from '../types';
import { getSources } from './index';
import RequireContext = __WebpackModuleApi.RequireContext;

const breakpointMedia = (media: string | null): ((nestedCss: string) => string) => {
  return (nestedCss: string) => {
    return media === null ? nestedCss : `@media ${media} { ${nestedCss} }`;
  };
};

const getSelector = (selector: string, extension: string) => {
  return extension === 'webp' ? `html.webp ${selector}` : selector;
};

const srcSetCss = (selector: string, sources: ExtensionSrcSet[]): string => {
  const result = sources.reduce<{ [dpr in Dpr]: string[] }>(
    (acc, source) => {
      const finalSelector = getSelector(selector, source.extension);
      acc['1x'].push(`${finalSelector} { background-image: url(${source.srcSet['1x']}); }`);
      source.srcSet['2x'] && acc['2x'].push(`${finalSelector} { background-image: url(${source.srcSet['2x']}); }`);
      source.srcSet['3x'] && acc['3x'].push(`${finalSelector} { background-image: url(${source.srcSet['3x']}); }`);
      return acc;
    },
    { '1x': [], '2x': [], '3x': [] },
  );

  return `
  ${result['1x'].join(' ')}
  ${result['2x'].length ? `@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { ${result['2x'].join(' ')} }`:''}
  ${result['3x'].length ? ` @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) { ${result['3x'].join(' ')} }`:''}
`;
};

export const backgroundCss = (selector: string, pictureData: BreakpointSource[]): string => {
  return pictureData
    .map((item) => {
      const breakpointMediaWrapper = breakpointMedia(item.breakpointMedia);
      return breakpointMediaWrapper(srcSetCss(selector, item.srcSets));
    })
    .join(' ');
};

export const backgroundCssSmart = (selector: string, requireImages: RequireContext): string => {
  const allSources = requireImages.keys().map<OrderedBreakpointSource>(requireImages);
  const pictureData = getSources(allSources);
  return backgroundCss(selector, pictureData);
};
