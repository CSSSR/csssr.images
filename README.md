# csssr.images

An opinionated library for handling responsive images with help of [imgrpoxy](https://imgproxy.net/).

It takes your images, generates optimized 1x, 2x and 3x versions of them and output them as <picture/>'s srcSet or background css.

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
