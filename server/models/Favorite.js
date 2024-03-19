import mongoose from "mongoose";

const { Schema } = mongoose;

let FavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  eventId: { type: Schema.Types.ObjectId, ref: "events" },
});

export default mongoose.model("favorites", FavoriteSchema);
