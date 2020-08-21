import path from 'path';
import webpack from 'webpack';
const ip = require('ip')
import { Plugin } from '../src/webpack';

const config: webpack.Configuration = {
  mode: 'production',
  bail: true,
  entry: path.resolve(__dirname, './react-entry.tsx'),
  output: {
    filename: 'out.js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        oneOf: [
          {
            resourceQuery: /dontresize/,
            // TODO reuse
            use: [
              {
                loader: path.resolve(__dirname, '../src/index.ts'),
                options: {
                  breakpoints: [
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
                    },
                  ],
                  imgproxy: {
                    disable: false,
                    imagesHost: process.env.HOST || `http://${ip.address()}:8081`,
                    host: process.env.IMGPROXY_HOST || 'http://localhost:8080',
                  },
                  originalPixelRatio: '1x',
                },
              },
              {
                loader: 'file-loader',
                options: {
                  publicPath: '/build',
                  name:
                    process.env.NODE_ENV === 'development'
                      ? '[path][name].[ext]'
                      : '[path][name]-[hash:8].[ext]',
                  esModule: false,
                },
              },
            ],
          },
          {
            use: [
              {
                loader: path.resolve(__dirname, '../src/index.ts'),
                options: {
                  breakpoints: [
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
                    },
                  ],
                  imgproxy: {
                    disable: false,
                    imagesHost: process.env.HOST || `http://${ip.address()}:8081`,
                    host: process.env.IMGPROXY_HOST || 'http://localhost:8080',
                  },
                  originalPixelRatio: '3x',
                },
              },
              {
                loader: 'file-loader',
                options: {
                  publicPath: '/build',
                  name:
                    process.env.NODE_ENV === 'development'
                      ? '[path][name].[ext]'
                      : '[path][name]-[hash:8].[ext]',
                  esModule: false,
                },
              },
            ]
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [new Plugin()],
};

export default config;
