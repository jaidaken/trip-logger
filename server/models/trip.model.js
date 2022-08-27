import mongoose from "mongoose";
const Schema = mongoose.Schema;
const oid = Schema.Types.ObjectId;

const TripSchema = new Schema({
  user: { type: oid, ref: 'User' },
  place: { type: oid, ref: 'Place' },
  date: Date,
});

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;
