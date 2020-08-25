import Imgproxy from 'imgproxy';
import { Dpr, SrcSet } from '../types';
import { getCompressionRatio } from '../utils';

type ImgproxyUrlBuilderConfig = {
  imagesHost: string;
  host: string;
};

export type BuildUrlsForPixelRatios = (
  pixelRatios: Dpr[],
  imagePath: string,
  extension: string,
) => SrcSet;

export const getImgproxyUrlBuilder = ({
  imagesHost,
  host,
}: ImgproxyUrlBuilderConfig): BuildUrlsForPixelRatios => {
  const imgproxy = new Imgproxy({
    baseUrl: host,
    encode: false,
  });

  const buildImgproxyUrl = (imgPath: string, dpr: number, extension: string) => {
    return imgproxy
      .builder()
      .dpr(dpr)
      .generateUrl(imagesHost + imgPath, extension);
  };

  return (pixelRatios: Dpr[], imagePath: string, extension: string): SrcSet => {
    const compressionsRatio = getCompressionRatio(pixelRatios);

    return pixelRatios.reduce((acc, item) => {
      const dprResize = compressionsRatio[item];
      if (dprResize !== undefined) {
        acc[item] = buildImgproxyUrl(imagePath, dprResize, extension);
      }
      return acc;
    }, {} as SrcSet);
  };
};
