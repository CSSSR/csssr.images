"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBreakpointMedia = exports.getSrcSetString = void 0;
const path_1 = __importDefault(require("path"));
const loader_utils_1 = __importDefault(require("loader-utils"));
const schema_utils_1 = __importDefault(require("schema-utils"));
const imgproxyUrlBuilder_1 = require("./imgproxyUrlBuilder");
const plugin_1 = require("./plugin");
const loaderOptionsSchema_1 = require("./loaderOptionsSchema");
exports.getSrcSetString = (srcSet) => {
    return Object.entries(srcSet)
        .map(([pixelRatio, url]) => `${url} ${pixelRatio}`)
        .join(', ');
};
exports.getBreakpointMedia = (breakpoint) => {
    let result = '';
    if (breakpoint.minWidth) {
        result += `(min-width: ${breakpoint.minWidth}px)`;
    }
    if (breakpoint.minWidth && breakpoint.maxWidth) {
        result += ' and ';
    }
    if (breakpoint.maxWidth) {
        result += `(max-width: ${breakpoint.maxWidth}px)`;
    }
    return result;
};
// Каждый импорт картинки проходит через этот лоадер и на выходе
// для каждой картинки получится массив с двумя значениями –
// srcset'ы для webp и srcset для оригинального расширения изображения
function default_1(source) {
    const options = loader_utils_1.default.getOptions(this);
    schema_utils_1.default(loaderOptionsSchema_1.schema, options, { name: 'Imgproxy responsive loader', baseDataPath: 'options' });
    const breakpoints = options.breakpoints;
    // Такой результат приходит от file-loader 'module.exports = "/build/myImage/mobile.all-4b767a7b.png";'
    // Получаем оригинальное имя файла изображения (originalImageFileName = mobile.all.png)
    const originalImageFileName = path_1.default.relative(this.context, this.resourcePath);
    const escapedBreakpointsNames = breakpoints.map((x) => x.name.replace('.', '\\.'));
    const regexp = new RegExp(`^(${escapedBreakpointsNames.join('|')})\\.(png|jpg|jpeg|gif)$`);
    const matches = originalImageFileName.match(regexp);
    if (!matches) {
        throw new Error(`Невалидное имя картинки ${originalImageFileName}. Директория с картинками должна содержать только картинки с именами соответствующими брейкпоинтам. Поддерживаемые расширения png, jpg, jpeg, gif.`);
    }
    const breakpointName = matches[1];
    const originalExtension = matches[2];
    const order = breakpoints.findIndex((breakpoint) => breakpoint.name === breakpointName);
    const breakpointMedia = exports.getBreakpointMedia(breakpoints[order]);
    // Получаем путь до картинки (outputImagePath = '/build/myImage/mobile.all-4b767a7b.png')
    const outputImagePath = source.replace(/^module.exports = "(.+)";$/, (_, imagePath) => imagePath);
    const buildUrlsForAllPixelRatios = imgproxyUrlBuilder_1.getImgproxyUrlBuilder(options.imgproxy);
    const webpSrcSet = buildUrlsForAllPixelRatios(outputImagePath, 'webp');
    const originalExtensionSrcSet = buildUrlsForAllPixelRatios(outputImagePath, originalExtension);
    const result = {
        // order нам понадобиться для сортировки массива различных разрешений одной картинки,
        // это используется в функции Picture#getImageSources
        order,
        data: [
            {
                breakpointName,
                breakpointMedia,
                extension: 'webp',
                srcSet: exports.getSrcSetString(webpSrcSet),
            },
            {
                breakpointName,
                breakpointMedia,
                extension: originalExtension,
                srcSet: exports.getSrcSetString(originalExtensionSrcSet),
            },
        ],
        fallbackSrc: originalExtensionSrcSet['1x'],
    };
    // Добавляем ссылки на картинки через imgproxy в глобальный объект
    plugin_1.imageUrls.push(...Object.values(webpSrcSet), ...Object.values(originalExtensionSrcSet));
    return `module.exports = ${JSON.stringify(result)}`;
}
exports.default = default_1;
