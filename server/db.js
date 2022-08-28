import mongoose from 'mongoose';

const localDBName = 'trip-logger';
const { MONGODB_URI = `mongodb://127.0.0.1/${localDBName}` } = process.env;

const options = {};

try {
  await mongoose.connect(MONGODB_URI, options);
} catch (error) {
  console.log(error);
}

mongoose.connection.on('error', (err) => {
  console.log(err);
});
