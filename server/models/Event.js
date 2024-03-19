import mongoose from "mongoose";

const { Schema } = mongoose;

let EventSchema = new Schema({
  eventName: { type: String },
  eventDate: { type: String },
  eventTime: { type: String },
  eventVenue: { type: String },
  eventMinPrice: { type: Number },
  eventMaxPrice: { type: Number },
  eventCity: { type: String },
  eventTickets: { type: String },
  eventPicture: { type: String },
  eventCategory: { type: String },
});

export default mongoose.model("events", EventSchema);
