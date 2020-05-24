import path from 'path'
import webpack from 'webpack'
import Plugin from '../src/webpack/plugin'
import { breakpoints } from './breakpoints'

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
                key: 'dbaff7c5c1d91044e63dfb5aed1e98d40e95455d39a1c5fff4132a7a00df522e7b9963f5ab088e82fc724a254122f83113040b7075fb9c34cb13f47cc0bfcd5e',
                salt: '6abf3fa134583d6453c543f67c1dce42f51235eb21f42a4b1ff4cb77333f3abd3861fa6bf5b95e7689b3ee5ba6f9da0984b4b0f85e824c53c7b9301102b39888',
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
}

export default config
