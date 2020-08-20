import Imgproxy from 'imgproxy';
import { Dpr, SrcSet } from '../types'

type ImgproxyUrlBuilderConfig = {
  imagesHost: string;
  host: string;
};

export type BuildUrlsForPixelRatios = (pixelRatios: Dpr[], imagePath: string, extension: string) => SrcSet;

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
    // TODO выводить коэффициенты сжатия (изменения размера) из количества элементов массива
    // или из значений массива
    // [1x, 2x] -> {1x: 0.5, 2x: 1}

    if (pixelRatios.length === 1) {
      return {
        '1x': buildImgproxyUrl(imagePath, 1, extension),
      }
    }
    return {
      '1x': buildImgproxyUrl(imagePath, 0.3333, extension),
      '2x': buildImgproxyUrl(imagePath, 0.6666, extension),
      // 0 здесь означает, что не будет никакого изменения размеров картинки
      '3x': buildImgproxyUrl(imagePath, 0, extension),
    }
  };
};
