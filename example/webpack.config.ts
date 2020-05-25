import path from 'path';
import webpack from 'webpack';
import { Plugin } from '../src';
import { breakpoints } from './breakpoints';

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
        use: [
          {
            loader: path.resolve(__dirname, '../src/webpack/loader.ts'),
            options: {
              breakpoints,
              imgproxy: {
                imagesHost: 'http://192.168.1.134:8081',
                host: 'http://localhost:8080',
              },
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
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [new Plugin()],
};

export default config;
