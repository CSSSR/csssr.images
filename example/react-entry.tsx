import React from 'react';
import ReactDOM from 'react-dom';
import { PictureSmart } from '../src/react';

const imagesCover = require.context('./images/myImage');
const images500 = require.context('./images/image500');
const backendDev = require.context('./images/backendDev');

ReactDOM.render(
  <div>
    <h1>Example usage of imgproxy-responsive loader</h1>
    <PictureSmart requireImages={imagesCover} alt="alt text" />
    <PictureSmart requireImages={images500} alt="alt text" />
    <PictureSmart requireImages={backendDev} alt="alt text" />
  </div>,
  document.getElementById('app'),
);
