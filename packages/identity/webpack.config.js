const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new ZipPlugin({
      filename: 'lambda_function.zip',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
};
