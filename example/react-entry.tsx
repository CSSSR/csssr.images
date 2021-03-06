import React from 'react';
import ReactDOM from 'react-dom';
import { PictureSmart } from '../src/react';
import { backgroundCssSmart } from '../src/utils/backgroundCss';
import { getOriginal } from '../src/utils';

// Adds 'webp' or 'avif' class to html element if the browser supports it.
import '../src/utils/imgSupportDetector';

const oneImageForAllBreakpoints = require.context('./images/oneImageForAllBreakpoints');
const differentBreakpoints = require.context('./images/differentBreakpoints');

const imageWithoutResize = require.context('./images/oneImageForAllBreakpoints?dontresize');

const myImageData = require('./images/oneImageForAllBreakpoints/all.png');
const myImageWithoutResizeData = require('./images/oneImageForAllBreakpoints/all.png?dontresize');

// Usage example getOriginal ()
console.log(getOriginal(myImageData));
console.log(getOriginal(myImageWithoutResizeData));

ReactDOM.render(
  <div>
    <h1>Example usage of csssr.images</h1>

    <h2>As picture tag</h2>

    <h3>One image for all resolutions</h3>
    <PictureSmart requireImages={oneImageForAllBreakpoints} alt="One image for all resolutions" />

    <h3>Image with different breakpoints</h3>
    <PictureSmart requireImages={differentBreakpoints} alt="Image with different breakpoints" />

    <h3>Image without resize</h3>
    <PictureSmart requireImages={imageWithoutResize} alt="Image without resize" />

    <h2>As background css</h2>

    <h3>One image for all resolutions</h3>
    <div className="one-image-for-all-resolutions" style={{ width: '100%', height: '100%' }}>
      One image for all resolutions on background
    </div>
    <style>{backgroundCssSmart('.one-image-for-all-resolutions', oneImageForAllBreakpoints)}</style>

    <h3>Different breakpoints</h3>
    <div className="different-breakpoints" style={{ width: '100%', height: '100%' }}>
      Image with different breakpoints on background
    </div>
    <style>{backgroundCssSmart('.different-breakpoints', differentBreakpoints)}</style>

    <h3>Image without resize</h3>

    <div className="image-without-resize" style={{ width: '100%', height: '100%' }}>
      Image without resize on background
    </div>
    <style>{backgroundCssSmart('.image-without-resize', imageWithoutResize)}</style>
  </div>,
  document.getElementById('app'),
);
