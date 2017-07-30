import * as chalk from 'chalk';

const appName = '[WL]';

const error = (...msgs: any[]): void => {
  console.error(chalk.red(appName, ...msgs));
};

const success = (...msgs: any[]): void => {
  console.log(chalk.green(appName, ...msgs));
};

const info = (...msgs: any[]): void => {
  console.info(chalk.blue(appName, ...msgs));
};

const logger = {
  error,
  success,
  info,
};

export { logger };
