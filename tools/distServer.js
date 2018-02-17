// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import { config as dotenvConfig } from 'dotenv';

import { chalkProcessing } from './chalkConfig';

dotenvConfig({ path: '../.env' });

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 4000,
  ui: {
    port: 4001
  },
  server: {
    baseDir: 'dist',
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});
