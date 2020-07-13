## Usage

Add loader to your `webpack` config:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|webp)$/i,
        use: [
          {
            loader: 'image-resolution-loader',
            options: {
              // loader options, see below
            },
          },
        ],
      },
    ],
  },
}
```

Then `import` (or `require`) the target file(s) in one of the bundle's files:

**file.js**

```js
import images from ('./file.png')
```

or

```js
const images = require('./file.png')
```

And run `webpack` via your preferred method.
The Loader will accept your image as the initial with 3x resolution and will generate from it 2x and 1x versions. Next, it will emit these images on the specified path and return the object, which will contain the path to the all versions of the image and srcSet.

> ℹ️ It is recommended to set the height and width of the initial image multiple of 3

## Options

### `name`

Type: `String|Function`
Default: `'[name][resolution].[ext]'`

Specifies a custom filename template for the target file(s) using the query
parameter `name`. For example, to emit a file from your `context` directory into
the output directory retaining the full directory structure, you might use:

> ℹ️ By default the path and name you specify will output the file in that same directory, and will also use the same URI path to access the file.

### `outputPath`

Type: `String|Function`
Default: `undefined`

Specify a filesystem path where the target file(s) will be placed.

### `publicPath`

Type: `String|Function`
Default: [`__webpack_public_path__`](https://webpack.js.org/api/module-variables/#__webpack_public_path__-webpack-specific-)

Specifies a custom public path for the target file(s).

### `webp`

Type: object
Default: {}

[sharp](https://github.com/lovell/sharp/) is used for optimizing webp images.The default options of [`sharp.webp()`](https://sharp.pixelplumbing.com/en/stable/api-output/#webp) are used if you omit this option.

### `jpg`

Type: object
Default: {}

[sharp](https://github.com/lovell/sharp/) is used for optimizing jpg images.The default options of [`sharp.jpg()`](https://sharp.pixelplumbing.com/en/stable/api-output/#jpeg) are used if you omit this option.

### `png`

Type: object
Default: {}

[imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant) is used for optimizing png images.The default options of [pngquant](https://github.com/kornelski/pngquant) are used if you omit this option.

### `zopfli`

Type: object
Default: {}

[imagemin-zopfli](https://github.com/imagemin/imagemin-zopfli) is used for compressing png images.The default options of [imagemin-zopfli](https://github.com/imagemin/imagemin-zopfli) are used if you omit this option.

### `disable`

Type: `Boolean`
Default: `false`

Disable processing of images by this loader (useful in development). Images data will still be generated but only for the original resolution.

## Placeholders

Full information about placeholders you can find [here](https://github.com/webpack/loader-utils#interpolatename).

### `[resolution]`

Type: `String`
Default: `@1x` | `@2x` | `@3x`

Image resolution.

## Examples

**file.js**

```js
import images from './file.png'
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|webp)$/i,
        use: [
          {
            loader: 'image-resolution-loader',
          },
        ],
      },
    ],
  },
}
```

The result will be a variable `images`, containing the following information:

```js
{
  '1x': '/file@1x.png',
  '2x': '/file@2x.png',
  '3x': '/file@3x.png',
  images: [{
    path: '/file@1x.png',
    width: /* width of 1x image */,
    height: /* height of 1x image */,
    resolution: '1x',
  }, {
    path: '/file@2x.png',
    width: /* width of 2x image */,
    height: /* height of 2x image */,
    resolution: '2x',
  }, {
    path: '/file@1x.png',
    width: /* width of 3x image */,
    height: /* height of 3x image */,
    resolution: '3x',
  }],
  imagesByResolution: {
    '1x': {
      path: '/file@1x.png',
      width: /* width of 1x image */,
      height: /* height of 1x image */,
    },
    '2x': {
      path: '/file@2x.png',
      width: /* width of 2x image */,
      height: /* height of 2x image */,
    },
    '3x': {
      path: '/file@3x.png',
      width: /* width of 3x image */,
      height: /* height of 3x image */,
    },
    srcSet: '/file@1x.png 1x,/file@2x.png 2x,/file@3x.png 3x',
  },
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/image-resolution-loader.svg
[npm-url]: https://npmjs.com/package/image-resolution-loader
[node]: https://img.shields.io/node/v/image-resolution-loader
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/ArtyomResh/image-resolution-loader.svg
[deps-url]: https://david-dm.org/ArtyomResh/image-resolution-loader
















[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]

Проблемы/TODO:
Imgproxy url'ы можно составлять как в билдтайме, так и в рантайме.
Набор инструментов в этой библиотеке заточен под подготовку url в билдтайме.
На это есть несколько причин:
1. Лучше потратить процессорное время в билдтайме, чем в рантайме
2. Подпись url в imgproxy возможна только в билдтайме
3. В билдтайме у нас есть доступТо что мы можем получить все возможные брейкпоинты по картинкам в билдтайме

Минусы такого подхода:
1. Неудобно использовать урлы с подписью? Не поиграешь
2. Нельзя воспользоваться require context dynamic

3. Импорт через require.context('./myImage') и функцию-хелпер/компонент
4. Во время импорта все ссылки на изображения imgproxy собираем в один json

<picture class="image css-1bv363l e1mofdgw0">
  <source media="(max-width: 767px)" type="image/webp"
          srcset="/_next/static/images/core-values/mobile.all/reliability-c770d411@1x.webp 1x,/_next/static/images/core-values/mobile.all/reliability-6c497195@2x.webp 2x,/_next/static/images/core-values/mobile.all/reliability-67dc4bb0@3x.webp 3x">
  <img
    srcset="/_next/static/images/core-values/desktop.m/reliability-8b8b8b67@1x.png  1x,/_next/static/images/core-values/desktop.m/reliability-a5845164@2x.png 2x,/_next/static/images/core-values/desktop.m/reliability-db64bb29@3x.png 3x"
    src="/_next/static/images/core-values/desktop.m/reliability-8b8b8b67@1x.png"
    alt="Illustration: a man folds a wall of lego">
</picture>

Проблемы:
1. Разработка на локалхосте, запускать докер или делать bypass всей этой логики?
2. Порядок source в picture, первый подошедший используется
3. Picture компонент можно удалить в пользу обобщения
4. Объединить Picture компоненты новые и старые
5. Собирать статистику какие картинки запрашиваются
6. Собирать все урлы и потом по ним проходить после сборки стенда
7. Поправить file-loader

Идеи:
1. Загружать picture тег асинхронно, например, как кусок html
img src='csssr.com/getimage/myimagename'
server.use('/getimage/:imagename', () => {})


Порядок в srcSet не имеет значения
Порядок в source имеет значение, первое подошедшее правило срабатывает


Ожидается file-loader перед этим лоадером

Можно потом вынести imgproxy в options loader'а

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/image-resolution-loader.svg
[npm-url]: https://npmjs.com/package/image-resolution-loader
[node]: https://img.shields.io/node/v/image-resolution-loader
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/ArtyomResh/image-resolution-loader.svg
[deps-url]: https://david-dm.org/ArtyomResh/image-resolution-loader
