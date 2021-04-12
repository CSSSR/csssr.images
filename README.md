# csssr.images

An opinionated library for handling responsive images with help of [imgproxy](https://imgproxy.net/).

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
  myImage/      <-| picture name
    mobile.png  <-| different image variations,
    tablet.png  <-| names should be the same as breakpoint names above,
    desktop.png <-| images should be in 3x resolution
```
this lib helps you to get

```html
<picture>
  <source 
    srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@webp 1x, 
            http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@webp 2x, 
            http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@webp 3x"
    media="(max-width: 767px)" 
    type="image/webp" 
  >
  <source 
    srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@png 1x, 
            http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@png 2x, 
            http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/mobile-a78dac89.png@png 3x"
    media="(max-width: 767px)" 
    type="image/png" 
  >
  <source 
    srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@webp 1x, 
            http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@webp 2x, 
            http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@webp 3x"
    media="(min-width: 768px) and (max-width: 1279px)" 
    type="image/webp" 
  >
  <source 
    srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@png 1x,
            http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@png 2x, 
            http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/tablet-4dcebf08.png@png 3x"
    media="(min-width: 768px) and (max-width: 1279px)" 
    type="image/png"
  >
  <source 
    srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@webp 1x, 
            http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@webp 2x, 
            http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@webp 3x"
    media="(min-width: 1280px)"
    type="image/webp" 
  >
  <source 
    srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 1x, 
            http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 2x, 
            http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 3x"
    media="(min-width: 1280px)" 
    type="image/png" 
  >
  <img 
    srcset="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 1x, 
            http://localhost:8080/insecure/dpr:0.6666/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 2x, 
            http://localhost:8080/insecure/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png 3x" 
    src="http://localhost:8080/insecure/dpr:0.3333/plain/http://192.168.1.134:8081/build/example/images/differentBreakpoints/desktop-3b835739.png@png" 
    alt="Image with different breakpoints"
  >
</picture>
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
            loader: '@csssr/csssr.images',
            options: {
              // @csssr/csssr.images loader options, see below
            },
          },
            // file-loader is required
            loader: 'file-loader',
            options: {
              // file-loader options by your preference
            },
          },
        ],
      },
    ],
  },
}
```

Then `import` the target file or `require.context()` target files:

**file.js**

```js
import images from ('./images/foo/boo.png')
```

or

```js
const images = require.context('./images/foo')
```

The loader will accept your image as the initial and will generate optimized version. Next, it will emit this image on the specified path and return the object, which will contain the path to the all versions of the image and srcSet.

## Options
### `resolution`
Type: `String`
Required: `true`

Resolution of original image. Could be `1x`, `2x` or `3x`.

> ℹ️ It is recommended to set the height and width of the initial image multiple of value you specify in this option

### `breakpoints`
Type: `Array`
Required: `true`

Array of breakpoints for which you want generate optimized images. Each breakpoint require a `name` and `minWidth` or `maxWidth` fields. Example:
```javascript
[    
  {
    name: 'mobile',
    maxWidth: 767,
  },
  {
    name: 'tablet',
    minWidth: 768,
    maxWidth: 1279,
  },
  {
    name: 'desktop',
    minWidth: 1280,
  }
]
```

Order of breakpoints matter — you should start from the smallest. 

> ℹ️ You should name your images according to the breakpoints for which they will be used, with one exception - name `all`. Image with name `all` will be last in source list and will be default, if there is no image for particular breakpoint. See [the example](./example).

### `imgproxy`
Type: `Object`
Required: `true`

Object that contains settings for [imgproxy](https://github.com/imgproxy/imgproxy) server.

#### `disable`
Type: `Boolean`
Default: `false`
Required: `false`

Disable processing of images by this loader (useful in development). Images data will still be generated but only for the original resolution.

#### `imagesHost`
Type: `string`
Required: `true`

URL of your images host.

#### `host`
Type: `string`
Required: `true`

URL of your imgproxy host.

## Components
### `Picture`
Returns <picture> tag with <source> tags according to your breakpoints.

#### `Props`
##### `sources`
Type: [`BreakpointSource`](./src/types.ts)
Required: `true`

Accepts an array of objects that contains information about images srsSets for different breakpoints.

##### `alt`
Type: `String`
Required: `false`

Alt text for <img>.

##### `testId`
Type: `String`
Required: `false`

`data-testid` attribute for <img>.

##### `loading`
Type: `String`
Required: `false`

`loading` attribute for <img>. Can be one of: `eager`, `lazy`.

##### `className`
Type: `String`
Required: `false`

`className` attribute for <picture>.

### `PictureSmart`

Accepts all the same props as [`Picture`](#Picture), except `requireImages`.

#### `Props`
##### `requireImages`
Type: `__WebpackModuleApi.RequireContext`
Required: `true`

Accepts webpack `require.context()` object and builds from it [`sources`](#sources) array. See [the example](./example).

## Utils

### getOriginal
Accepts [`BreakpointSource`](./src/types.ts) array and return biggest URL to original image
```js
const pictureData = require('./images/foo/boo.png')
getOriginal(pictureData)
```
#### pictureData
Type: [`BreakpointSource`](./src/types.ts) 
An array of objects that contains information about images srsSets for different breakpoints

### backgroundCss
Accepts CSS selector and [`BreakpointSource`](./src/types.ts) object and return css string that contains rules for `background-image` for your breakpoints for provided selector.
```js
const pictureData = require('./images/foo/boo.png')
const selector = '.boo'
backgroundCss(selector, pictureData)
```
Will return
```css
.boo {
  background-image:url(*generated url to your image*);
}

@media *media rules for one of your breakpoints* {
  .boo {
    background-image: url(*generated url to your image*);
  }
}

@media *media rules for one of your breakpoints* {
  .boo{
    background-image:url(*generated url to your image*)
  }
}
```
#### selector
Type: `String`
CSS selector for which you want add optimized images

#### pictureData
Type: [`BreakpointSource`](./src/types.ts) 
An array of objects that contains information about images srsSets for different breakpoints

### backgroundCssSmart
Works the same as [`backgroundCss`](#backgroundCss) but instead of [`BreakpointSource`](./src/types.ts) it accepts `__WebpackModuleApi.RequireContext` object.
```js
const pictureData = require.context('./images/foo')
backgroundCss('.boo', pictureData)
```

## License

[MIT](./LICENSE)