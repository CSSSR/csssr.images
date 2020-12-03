import webpack from 'webpack';
import path from 'path';
import loaderUtils from 'loader-utils';
import { validate } from 'schema-utils';
import { getImgproxyUrlBuilder } from './imgproxyUrlBuilder';
import { Breakpoint, OrderedBreakpointSource, SrcSet, Dpr } from '../types';
import { imageUrls } from './plugin';
import { schema } from './loaderOptionsSchema';
import { getBreakpointMedia, getPixelRatios } from '../utils';

// Такое имя используется, если нужна одна картинка для всех разрешений
// В таком случаем не будут сгенерированы медиа выражения для разных breakpoint'ов
const all = 'all';

export type LoaderOptions = {
  breakpoints: Breakpoint[];
  imgproxy: {
    disable: boolean;
    imagesHost: string;
    host: string;
  };
  originalPixelRatio: Dpr;
};

// Каждый импорт картинки проходит через этот лоадер и на выходе
// для каждой картинки получится массив с двумя значениями –
// srcset'ы для webp и srcset для оригинального расширения изображения
export const loader = function (this: webpack.loader.LoaderContext, source: string): string {
  const options = (loaderUtils.getOptions(this) as unknown) as LoaderOptions;

  validate(schema, options, { name: 'Imgproxy responsive loader', baseDataPath: 'options' });

  const pixelRatios: Dpr[] = getPixelRatios(options.originalPixelRatio);
  const breakpoints: Breakpoint[] = options.breakpoints;
  // Такой результат приходит от file-loader 'module.exports = "/build/myImage/mobile.all-4b767a7b.png";'
  // Получаем оригинальное имя файла изображения (originalImageFileName = mobile.all.png)
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
      `Невалидное имя картинки ${originalImageFileName}. Директория с картинками должна содержать только картинки с именами соответствующими брейкпоинтам. Поддерживаемые расширения png, jpg, jpeg, gif.`,
    );
  }

  const breakpointName = matches.groups['breakpointName'];
  const originalExtension = matches.groups['originalExtension'];

  // order нам понадобится для сортировки массива различных разрешений одной картинки
  const order =
    breakpointName === all
      ? -1
      : breakpoints.findIndex((breakpoint) => breakpoint.name === breakpointName);
  const breakpointMedia = breakpointName === all ? null : getBreakpointMedia(breakpoints[order]);

  // Получаем путь до картинки (outputImagePath = '/build/myImage/mobile.all-4b767a7b.png')
  const outputImagePath = source.replace(
    /^module.exports = (__webpack_public_path__ \+ )?"(.+)";$/,
    (a, b, imagePath) => imagePath,
  );

  let webpSrcSet: SrcSet, originalExtensionSrcSet: SrcSet, data: OrderedBreakpointSource;
  // Отключает процессинг картинок, генерируется srcSet только для оригинального типа изображения
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
    // Добавляем ссылки на картинки через imgproxy в глобальный объект
    imageUrls.push(
      ...(Object.values(webpSrcSet) as string[]),
      ...(Object.values(originalExtensionSrcSet) as string[]),
    );
  }

  const result: OrderedBreakpointSource = data;

  return `module.exports = ${JSON.stringify(result)}`;
};
