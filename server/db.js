import mongoose from "mongoose";

const options = {};

try {
  await mongoose.connect(url, options);
} catch (error) {
  console.log(error);
}

mongoose.connection.on('error', err => {
  console.log(err);
})
