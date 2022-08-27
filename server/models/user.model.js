import mongoose from "mongoose";
const Schema = mongoose.Schema;
const oid = Schema.Types.ObjectId;

const UserSchema = new Schema({
  sub: { //Auth0 ID
    type: String,
    required: true,
  },
  place: [{ type: oid, ref: 'Trip' }],
});

const User = mongoose.model("User", UserSchema);

export default User;
