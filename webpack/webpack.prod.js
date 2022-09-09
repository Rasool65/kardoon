const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const filename = (ext) => `[name].[fullhash].${ext}`;

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    // path: path.resolve(__dirname, '\\192.168.192.131\\Shared_khalafi\\Dev-04-Mr.Aghajani'),
    filename: filename('js'),
    chunkFilename: 'vendor.[id].[fullhash].js',
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
