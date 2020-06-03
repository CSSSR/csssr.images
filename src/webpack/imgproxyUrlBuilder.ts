import Imgproxy from 'imgproxy';
import { SrcSet } from '../types';

type ImgproxyUrlBuilderConfig = {
  imagesHost: string;
  host: string;
};

export type BuildUrlsForAllPixelRatios = (imagePath: string, extension: string) => SrcSet;

export const getImgproxyUrlBuilder = ({
  imagesHost,
  host,
}: ImgproxyUrlBuilderConfig): BuildUrlsForAllPixelRatios => {
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

  return (imagePath: string, extension: string): SrcSet => ({
    '1x': buildImgproxyUrl(imagePath, 0.3333, extension),
    '2x': buildImgproxyUrl(imagePath, 0.6666, extension),
    // 0 здесь означает, что не будет никакого изменения размеров картинки
    '3x': buildImgproxyUrl(imagePath, 0, extension),
  });
};
