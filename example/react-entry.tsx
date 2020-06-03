import React from 'react';
import ReactDOM from 'react-dom';
import { PictureSmart } from '../src/react';
import { backgroundCssSmart } from '../src/utils/backgroundCss';

const imagesCover = require.context('./images/myImage');
const images500 = require.context('./images/image500');
const backendDev = require.context('./images/backendDev');
const onlyOneResolution = require.context('./images/onlyOneResolution');

ReactDOM.render(
  <div>
    <h1>Example usage of imgproxy-responsive loader</h1>
    <PictureSmart requireImages={imagesCover} alt="alt text" />
    <PictureSmart requireImages={images500} alt="alt text" />
    <PictureSmart requireImages={backendDev} alt="alt text" />
    <PictureSmart requireImages={onlyOneResolution} alt="alt text" />
    <div className="my-selector" style={{ width: '100%', height: '100%' }}>
      my image on background
    </div>
    <style>{backgroundCssSmart('.my-selector', imagesCover)}</style>
  </div>,
  document.getElementById('app'),
);
