import webpack from 'webpack';
import path from 'path';
import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';
import { getImgproxyUrlBuilder } from './imgproxyUrlBuilder';
import { Breakpoint, OrderedBreakpointSource, SrcSet } from '../types';
import { imageUrls } from './plugin';
import { schema } from './loaderOptionsSchema';
import { getBreakpointMedia } from '../utils';

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
  shouldResize: boolean;
};

// Каждый импорт картинки проходит через этот лоадер и на выходе
// для каждой картинки получится массив с двумя значениями –
// srcset'ы для webp и srcset для оригинального расширения изображения
export const loader = function (this: webpack.loader.LoaderContext, source: string): string {
  const options = loaderUtils.getOptions(this) as unknown as LoaderOptions;

  validateOptions(schema, options, { name: 'Imgproxy responsive loader', baseDataPath: 'options' });

  // TODO
  // Подготовить здесь массив с pixelRatios [1x 2x 3x] [1x 2x] [1x]
  // Я не уверен в каком порядке должны быть элементы массива

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
  const outputImagePath = source.replace(/^module.exports = (__webpack_public_path__ \+ )?"(.+)";$/, (a, b, imagePath) => imagePath);

  let webpSrcSet: SrcSet, originalExtensionSrcSet: SrcSet, data: OrderedBreakpointSource;
  // Отключает процессинг картинок, генерируется srcSet только для оригинального типа изображения
  if (options.imgproxy.disable) {
    // TODO пока не смотрим disable

    originalExtensionSrcSet = {
      '1x': outputImagePath,
      '2x': outputImagePath,
      '3x': outputImagePath,
    };
    data = {
      order,
      breakpointMedia,
      srcSets: [
        {
          extension: originalExtension,
          srcSet: originalExtensionSrcSet,
        },
      ],
    };
  } else {
    const buildUrlsForPixelRatios = getImgproxyUrlBuilder(options.imgproxy);
    console.log(options.shouldResize)
    if (options.shouldResize) {
      // TODO убрать хардкод, вынести в опции лоадера?
      // originalRatio: 3x -> 3x 2x 1x
      // originalRatio: 2x -> 2x 1x
      // originalRatio: 1x -> 1x
      webpSrcSet = buildUrlsForPixelRatios(['1x', '2x', '3x'], outputImagePath, 'webp');
      originalExtensionSrcSet = buildUrlsForPixelRatios(['1x', '2x', '3x'], outputImagePath, originalExtension);
    } else {
      webpSrcSet = buildUrlsForPixelRatios(['1x'], outputImagePath, 'webp');
      originalExtensionSrcSet = buildUrlsForPixelRatios(['1x'], outputImagePath, originalExtension);
    }
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
    imageUrls.push(...(Object.values(webpSrcSet) as string[]), ...(Object.values(originalExtensionSrcSet) as string[]));
  }

  const result: OrderedBreakpointSource = data;

  return `module.exports = ${JSON.stringify(result)}`;
};
