import webpack from 'webpack';
import path from 'path';
import loaderUtils from 'loader-utils';
import { validate } from 'schema-utils';
import { getImgproxyUrlBuilder } from './imgproxyUrlBuilder';
import { Breakpoint, OrderedBreakpointSource, SrcSet, Dpr } from '../types';
import { imageUrls } from './plugin';
import { schema } from './loaderOptionsSchema';
import { getBreakpointMedia } from '../utils/getBreakpointMedia';
import { getPixelRatios } from '../utils/getPixelRatios';

// This name is used if you want one picture for all resolutions
// In this case, media expressions for different breakpoints will not be generated
const all = 'all';

export type LoaderOptions = {
  breakpoints: Breakpoint[];
  imgproxy: {
    disable: boolean;
    imagesHost: string;
    host: string;
    generateAvif: boolean;
  };
  originalPixelRatio: Dpr;
};

// Each import of an image passes through this loader and in the output
// for each picture we get an array with two values
// srcset for webp and srcset for the original image extension
export const loader = function (this: webpack.loader.LoaderContext, source: string): string {
  const options = (loaderUtils.getOptions(this) as unknown) as LoaderOptions;

  validate(schema, options, { name: 'Imgproxy responsive loader', baseDataPath: 'options' });

  const pixelRatios: Dpr[] = getPixelRatios(options.originalPixelRatio);
  const breakpoints: Breakpoint[] = options.breakpoints;
  // This is the result of the file-loader 'module.exports = "/build/myImage/mobile.all-4b767a7b.png";'
  // Get the original name of the image file (originalImageFileName = mobile.all.png)
  const originalImageFileName = path.relative(this.context, this.resourcePath);

  const escapedBreakpointsNames = breakpoints.map((item) => item.name.replace('.', '\\.'));
  const regexp = new RegExp(
    `^(?<breakpointName>${escapedBreakpointsNames.join(
      '|',
    )}|${all})\\.(?<originalExtension>png|jpg|jpeg|gif)$`,
  );

  const matches = originalImageFileName.match(regexp);

  if (!matches || !matches.groups) {
    throw new Error(
      `Invalid picture name ${originalImageFileName}. The picture directory should contain only pictures with names corresponding to breakpoints. Supported extensions are png, jpg, jpeg, gif.`,
    );
  }

  const breakpointName = matches.groups['breakpointName'];
  const originalExtension = matches.groups['originalExtension'];

  // we need order to sort an array of different resolutions for one picture
  const order =
    breakpointName === all
      ? -1
      : breakpoints.findIndex((breakpoint) => breakpoint.name === breakpointName);
  const breakpointMedia = breakpointName === all ? null : getBreakpointMedia(breakpoints[order]);

  // Get the path to the image (outputImagePath = '/build/myImage/mobile.all-4b767a7b.png')
  const outputImagePath = source.replace(
    /^module.exports = (__webpack_public_path__ \+ )?"(.+)";$/,
    (a, b, imagePath) => imagePath,
  );

  let avifSrcSet: SrcSet, webpSrcSet: SrcSet, originalExtensionSrcSet: SrcSet, data: OrderedBreakpointSource;
  // Disables picture processing, srcSet is generated only for the original image type
  if (options.imgproxy.disable) {
    data = {
      order,
      breakpointMedia,
      srcSets: [
        {
          extension: originalExtension,
          srcSet: pixelRatios.reduce((acc, item): SrcSet => {
            acc[item] = outputImagePath;
            return acc;
          }, {} as SrcSet),
        },
      ],
    };
  } else {
    const buildUrlsForPixelRatios = getImgproxyUrlBuilder(options.imgproxy);
    avifSrcSet = buildUrlsForPixelRatios(pixelRatios, outputImagePath, 'avif');
    webpSrcSet = buildUrlsForPixelRatios(pixelRatios, outputImagePath, 'webp');
    originalExtensionSrcSet = buildUrlsForPixelRatios(
      pixelRatios,
      outputImagePath,
      originalExtension,
    );

    data = {
      order,
      breakpointMedia,
      srcSets: [
        {
          extension: 'webp',
          srcSet: webpSrcSet,
        },
        {
          extension: originalExtension,
          srcSet: originalExtensionSrcSet,
        },
      ],
    };

    if (options.imgproxy.generateAvif) {
      data.srcSets.unshift({
        extension: 'avif',
        srcSet: avifSrcSet,
      })

      imageUrls.push(
        ...(Object.values(avifSrcSet) as string[]),
      );
    } 
    
    // Add links to images via imgproxy to the global object
    imageUrls.push(
      ...(Object.values(webpSrcSet) as string[]),
      ...(Object.values(originalExtensionSrcSet) as string[]),
    );
  }

  const result: OrderedBreakpointSource = data;

  return `module.exports = ${JSON.stringify(result)}`;
};
