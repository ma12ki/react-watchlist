import * as chalk from 'chalk';

const appName = '[WL]';

const error = (...msgs: any[]): void => {
  console.error((chalk as any).red(appName, ...msgs));
};

const success = (...msgs: any[]): void => {
  console.log((chalk as any).green(appName, ...msgs));
};

const info = (...msgs: any[]): void => {
  console.info((chalk as any).blue(appName, ...msgs));
};

const logger = {
  error,
  success,
  info,
};

export { logger };
