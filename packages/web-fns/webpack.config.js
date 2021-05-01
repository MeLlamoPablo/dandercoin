const execa = require('execa');
const path = require('path');
const { DefinePlugin } = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

async function getPageRoutes() {
  const { stdout: files } = await execa(
    'find',
    ['packages/web/src/pages/*', '-name', 'index.tsx'],
    {
      cwd: path.join(__dirname, '../..'),
      shell: true,
    },
  );

  return files
    .split('\n')
    .map((it) => it.replace('packages/web/src/pages', '').replace('/index.tsx', ''))
    .filter(Boolean);
}

module.exports = async () => ({
  entry: {
    apexOriginRequest: './src/apexOriginRequest.ts',
    originRequest: './src/originRequest.ts',
    originResponse: './src/originResponse.ts',
  },
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
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new DefinePlugin({
      __PAGE_ROUTES__: JSON.stringify(await getPageRoutes()),
    }),
    new ZipPlugin({
      filename: 'apex_origin_request_lambda_function.zip',
      include: ['apexOriginRequest.js'],
      pathMapper: () => 'index.js',
    }),
    new ZipPlugin({
      filename: 'origin_request_lambda_function.zip',
      include: ['originRequest.js'],
      pathMapper: () => 'index.js',
    }),
    new ZipPlugin({
      filename: 'origin_response_lambda_function.zip',
      include: ['originResponse.js'],
      pathMapper: () => 'index.js',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
});
