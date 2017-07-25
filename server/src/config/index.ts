import { config as dotenvConfig } from 'dotenv';

const env = dotenvConfig();

console.log(env);

const config = {
  get production(): boolean {
    return process.env.NODE_ENV === 'production';
  },
  get mongoUri(): string {
    return process.env.WL_MONGO_URI;
  },
  get port(): number {
    return process.env.WL_PORT;
  },
  get jwtSecret(): string {
    return process.env.WL_JWT_SECRET;
  },
};

export { config };
