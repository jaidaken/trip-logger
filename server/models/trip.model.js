import mongoose from 'mongoose';

const { Schema } = mongoose;
const oid = Schema.Types.ObjectId;

const TripSchema = new Schema({
  user: { type: oid, ref: 'User', required: true },
  place: { type: oid, ref: 'Place', required: true },
  date: { type: Date, required: true },
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;
