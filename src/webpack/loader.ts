import webpack from 'webpack';
import path from 'path';
import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';
import { getImgproxyUrlBuilder } from './imgproxyUrlBuilder';
import { Breakpoint, ImgproxyResponsiveLoaderResult } from '../types';
import { imageUrls } from './plugin';
import { schema } from './loaderOptionsSchema';
import { getBreakpointMedia } from '../utils';

// Такое имя используется, если нужна одна картинка для всех разрешений
// В таком случаем не будут сгенерированы медиа выражения для разных breakpoint'ов
const all = 'all'

// Каждый импорт картинки проходит через этот лоадер и на выходе
// для каждой картинки получится массив с двумя значениями –
// srcset'ы для webp и srcset для оригинального расширения изображения
export const loader = function (this: webpack.loader.LoaderContext, source: string): string {
  const options = loaderUtils.getOptions(this);

  validateOptions(schema, options, { name: 'Imgproxy responsive loader', baseDataPath: 'options' });

  const breakpoints: Breakpoint[] = options.breakpoints;

  // Такой результат приходит от file-loader 'module.exports = "/build/myImage/mobile.all-4b767a7b.png";'
  // Получаем оригинальное имя файла изображения (originalImageFileName = mobile.all.png)
  const originalImageFileName = path.relative(this.context, this.resourcePath);

  const escapedBreakpointsNames = breakpoints.map((item) => item.name.replace('.', '\\.'));
  const regexp = new RegExp(`^(?<breakpointName>${escapedBreakpointsNames.join('|')}|${all})\\.(?<originalExtension>png|jpg|jpeg|gif)$`);

  const matches = originalImageFileName.match(regexp);

  if (!matches || !matches.groups) {
    throw new Error(
      `Невалидное имя картинки ${originalImageFileName}. Директория с картинками должна содержать только картинки с именами соответствующими брейкпоинтам. Поддерживаемые расширения png, jpg, jpeg, gif.`,
    );
  }

  const breakpointName = matches.groups['breakpointName']
  const originalExtension = matches.groups['originalExtension']

  const order = breakpointName === all ? -1 : breakpoints.findIndex((breakpoint) => breakpoint.name === breakpointName);
  const breakpointMedia = breakpointName === all ? undefined : getBreakpointMedia(breakpoints[order]);

  // Получаем путь до картинки (outputImagePath = '/build/myImage/mobile.all-4b767a7b.png')
  const outputImagePath = source.replace(/^module.exports = "(.+)";$/, (_, imagePath) => imagePath);

  const buildUrlsForAllPixelRatios = getImgproxyUrlBuilder(options.imgproxy);
  const webpSrcSet = buildUrlsForAllPixelRatios(outputImagePath, 'webp');
  const originalExtensionSrcSet = buildUrlsForAllPixelRatios(outputImagePath, originalExtension);

  const result: ImgproxyResponsiveLoaderResult = {
    // order нам понадобиться для сортировки массива различных разрешений одной картинки,
    // это используется в функции Picture#getImageSources
    order,
    data: [
      {
        breakpointName,
        breakpointMedia,
        extension: 'webp',
        srcSet: webpSrcSet,
      },
      {
        breakpointName,
        breakpointMedia,
        extension: originalExtension,
        srcSet: originalExtensionSrcSet,
      },
    ],
    fallbackSrc: originalExtensionSrcSet['1x'],
  };

  // Добавляем ссылки на картинки через imgproxy в глобальный объект
  imageUrls.push(...Object.values(webpSrcSet), ...Object.values(originalExtensionSrcSet));

  return `module.exports = ${JSON.stringify(result)}`;
}
