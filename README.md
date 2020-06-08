[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]

# csssr.images

An opinionated library for handling responsive images with help of [imgrpoxy](https://imgproxy.net/).

It takes your images, generates 1x, 2x and 3x of them and output them as <picture/>'s srcSet or background css.

## Overview

Having breakpoints like that
```
mobile: (max-width: 767px)
tablet: (min-width: 768px, max-width: 1279px)
desktop: (min-width: 1280px)
```
and images structured like that
```
images/
  myImage/      <- picture name
    mobile.png  <-| different image variations,
    tablet.png  <-| names should be the same as breakpoint names above,
    desktop.png <-| images should be in 3x resolution
```
this lib helps you to get
```html
<picture><source media="(max-width: 767px)" type="image/webp" srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@webp 1x, http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@webp 2x, http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@webp 3x"><source media="(max-width: 767px)" type="image/png" srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@png 1x, http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@png 2x, http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@png 3x"><source media="(min-width: 768px) and (max-width: 1279px)" type="image/webp" srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@webp 1x, http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@webp 2x, http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@webp 3x"><source media="(min-width: 768px) and (max-width: 1279px)" type="image/png" srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@png 1x, http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@png 2x, http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@png 3x"><source media="(min-width: 1280px)" type="image/webp" srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@webp 1x, http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@webp 2x, http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@webp 3x"><source media="(min-width: 1280px)" type="image/png" srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 1x, http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 2x, http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 3x"><img srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 1x, http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 2x, http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 3x" src="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png" alt="Image with different breakpoints"></picture>
```


## Install

```console
npm i @csssr/csssr.images
```

## Usage

I recommend you to check [the example](./example).

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
