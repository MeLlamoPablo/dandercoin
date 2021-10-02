const withPlugins = require('next-compose-plugins');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

const disableEslintPlugin = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    phases: [
      PHASE_DEVELOPMENT_SERVER,
      PHASE_PRODUCTION_BUILD,
      PHASE_PRODUCTION_SERVER,
    ],
    eslint: {
      ...nextConfig.eslint,
      // We don't lint during the build because GitHub actions performs its own lint step
      ignoreDuringBuilds: true,
    },
  });

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
    images: {
      ...nextConfig.images,
      // Apparently Next 11 doesn't like our image loader so we need this option
      disableStaticImages: true,
    },
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
  [disableEslintPlugin],
  [loadFontsPlugin],
  [loadImagesPlugin],
]);
