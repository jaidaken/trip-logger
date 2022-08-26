import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;
