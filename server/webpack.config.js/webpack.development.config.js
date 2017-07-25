const webpackConfig = {
  output: {
    devtoolModuleFilenameTemplate        : '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  devtool: 'source-map',
  module: {
    rules: [
     {
       enforce: 'pre',
       test: /\.js$/,
       loader: 'source-map-loader',
       exclude: /node_modules/
     },
     {
       enforce: 'pre',
       test: /\.ts?$/,
       use: 'source-map-loader',
       exclude: /node_modules/
     }
   ]
  },
};

module.exports = webpackConfig;
