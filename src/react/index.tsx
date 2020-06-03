import React from 'react';
import { OrderedBreakpointSource, BreakpointSource } from '../types';
import RequireContext = __WebpackModuleApi.RequireContext;
import { getSources, getSrcSetString } from '../utils';

export type PictureCommonProps = {
  alt: string;
  className?: string;
  testid?: string;
};

export type PictureProps = {
  sources: BreakpointSource[];
} & PictureCommonProps;

export const Picture: React.FC<PictureProps> = ({ sources, alt, className, testid }) => {
  const lastSource = sources[sources.length - 1];
  const fallbackSrcSet = lastSource.srcSets[lastSource.srcSets.length - 1].srcSet;

  return (
    <picture className={className}>
      {sources.map(({ breakpointMedia, srcSets }) => {
        return srcSets.map(({ extension, srcSet }) => (
          <source
            key={`${breakpointMedia}_${extension}`}
            media={breakpointMedia === null ? undefined : breakpointMedia}
            type={`image/${extension}`}
            srcSet={getSrcSetString(srcSet)}
          />
        ));
      })}
      <img
        srcSet={getSrcSetString(fallbackSrcSet)}
        src={fallbackSrcSet['1x']}
        data-testid={testid}
        alt={alt}
      />
    </picture>
  );
};

export type PictureSmartProps = {
  requireImages: RequireContext;
} & PictureCommonProps;

export const PictureSmart: React.FC<PictureSmartProps> = (props) => {
  const { requireImages, ...rest } = props;
  const allSources = requireImages.keys().map<OrderedBreakpointSource>(requireImages);
  const sources = getSources(allSources);
  return <Picture sources={sources} {...rest} />;
};
