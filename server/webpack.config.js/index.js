const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const developmentConfig = require('./webpack.development.config');
const productionConfig = require('./webpack.production.config');

let environmentConfig = {};

switch (process.env.NODE_ENV) {
  case 'production':
    environmentConfig = webpackMerge(baseConfig, productionConfig);
    break;
  default:
    environmentConfig = webpackMerge(baseConfig, developmentConfig);
}

module.exports = environmentConfig;
