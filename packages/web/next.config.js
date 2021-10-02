const withPlugins = require('next-compose-plugins');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

const loadFontsPlugin = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    phases: [
      PHASE_DEVELOPMENT_SERVER,
      PHASE_PRODUCTION_BUILD,
      PHASE_PRODUCTION_SERVER,
    ],
    webpack: (baseConfig, baseOptions) => {
      const config =
        typeof nextConfig.webpack === 'function'
          ? nextConfig.webpack(baseConfig, baseOptions)
          : baseConfig;

      config.module.rules.push({
        test: /\.(?:ttf|woff2?)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              publicPath: '/_next/static/fonts',
              outputPath: 'static/fonts/',
              name: '[name]-[hash].[ext]',
            },
          },
        ],
      });

      return config;
    },
  });

const loadImagesPlugin = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    phases: [
      PHASE_DEVELOPMENT_SERVER,
      PHASE_PRODUCTION_BUILD,
      PHASE_PRODUCTION_SERVER,
    ],
    webpack: (baseConfig, baseOptions) => {
      const config =
        typeof nextConfig.webpack === 'function'
          ? nextConfig.webpack(baseConfig, baseOptions)
          : baseConfig;

      config.module.rules.push({
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            outputPath: 'static/images/',
            publicPath: '/_next/static/images',
          },
        },
      });

      return config;
    },
  });

module.exports = withPlugins([
  [loadFontsPlugin],
  [loadImagesPlugin],
]);
