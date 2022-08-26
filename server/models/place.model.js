import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Place = mongoose.model("Place", PlaceSchema);

export default Place;
