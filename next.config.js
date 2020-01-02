const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: function(config) {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        }),
      );
    }

    return config;
  },
});
