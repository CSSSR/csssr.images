import React from 'react';
import { ImageSource, ImgproxyResponsiveLoaderResult } from '../types';
import RequireContext = __WebpackModuleApi.RequireContext;

export type PictureCommonProps = {
  alt: string;
};

export type PictureData = {
  sources: ImageSource[];
  fallbackSrcSet: string;
  fallbackSrc: string;
};

export type PictureInternalProps = {
  pictureData: PictureData;
} & PictureCommonProps;

export const PictureInternal: React.FC<PictureInternalProps> = ({ pictureData, alt }) => {
  return (
    <picture>
      {pictureData.sources.map(({ breakpointName, breakpointMedia, extension, srcSet }) => {
        return (
          <source
            key={`${breakpointName}_${extension}`}
            media={breakpointMedia}
            type={`image/${extension}`}
            srcSet={srcSet}
          />
        );
      })}
      <img srcSet={pictureData.fallbackSrcSet} src={pictureData.fallbackSrc} alt={alt} />
    </picture>
  );
};

export type PictureProps = {
  requireImages: RequireContext;
} & PictureCommonProps;

const getPictureData = (requireFn: RequireContext): PictureData => {
  const allSources = requireFn.keys().map<ImgproxyResponsiveLoaderResult>(requireFn);

  // Сортировка sources в порядке списка breakpoints
  allSources.sort((a, b) => a.order - b.order);

  const lastSource = allSources[allSources.length - 1];

  return {
    sources: allSources.map<ImageSource[]>((source) => source.data).flat(),
    fallbackSrcSet: lastSource.data[lastSource.data.length - 1].srcSet,
    fallbackSrc: lastSource.fallbackSrc,
  };
};

export const Picture: React.FC<PictureProps> = (props) => {
  const { requireImages, ...rest } = props;
  const pictureData = getPictureData(requireImages);
  return <PictureInternal pictureData={pictureData} {...rest} />;
};
