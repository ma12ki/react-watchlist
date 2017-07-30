import * as chalk from 'chalk';

const error = (...msgs: any[]): void => {
  console.error(chalk.red(...msgs));
};

const success = (...msgs: any[]): void => {
  console.log(chalk.green(...msgs));
};

const info = (...msgs: any[]): void => {
  console.info(chalk.blue(...msgs));
};

const logger = {
  error,
  success,
  info,
};

export { logger };
