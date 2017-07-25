import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

const connect = (uri) => {
  console.log(`Attempting to connect to db at ${uri}...`);
  return mongoose.connect(uri)
    .then(() => {
      console.log('Successfully connected to db');
    });
};

export {
  connect,
};
