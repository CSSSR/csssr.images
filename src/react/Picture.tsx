import React from 'react';
import { ImgproxyResponsiveLoaderResult, PictureData } from '../types';
import RequireContext = __WebpackModuleApi.RequireContext;
import { getPictureData } from '../utils/utils';

export type PictureCommonProps = {
  alt: string;
  className?: string;
  testid?: string;
};

export type PictureProps = {
  pictureData: PictureData;
} & PictureCommonProps;

export const Picture: React.FC<PictureProps> = ({ pictureData, alt, className, testid }) => {
  return (
    <picture className={className}>
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
      <img
        srcSet={pictureData.fallbackSrcSet}
        src={pictureData.fallbackSrc}
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
  const allSources = requireImages.keys().map<ImgproxyResponsiveLoaderResult>(requireImages);
  const pictureData = getPictureData(allSources);
  return <Picture pictureData={pictureData} {...rest} />;
};
