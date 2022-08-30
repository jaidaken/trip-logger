import mongoose from 'mongoose';

// const options = {
//   autoIndex: false, // Don't build indexes
//   maxPoolSize: 10, // Maintain up to 10 socket connections
//   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//   family: 4 // Use IPv4, skip trying IPv6
// };

const localDBName = 'trip-logger';
const { MONGODB_URI = `mongodb://127.0.0.1/${localDBName}` } = process.env;

console.log(`MONGODB_URI ${MONGODB_URI}`);

const options = {};

try {
  await mongoose.connect(MONGODB_URI, options);
} catch (error) {
  console.log('dbconerr', error);
}

mongoose.connection.on('error', (err) => {
  console.log('dbpostconnerr', err);
});
