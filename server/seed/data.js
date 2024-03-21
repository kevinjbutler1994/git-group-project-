import data from "../data.json" assert { type: "json" };
import Event from "../models/Event.js";
import mongoose from "mongoose";
import connection from "../db/connection.js";

let eventData = data._embedded.events.map((item) => {
  const event = {};
  event.eventName = item.name;
  event.eventDate = item.dates.start.localDate;
  event.eventTime = item.dates.start.localTime.slice(0, -3);
  event.eventVenue = item._embedded.venues[0].name;
  event.eventMinPrice = item.priceRanges ? item.priceRanges[0].min : 0;
  event.eventMaxPrice = item.priceRanges ? item.priceRanges[0].max : 0;
  // event.eventCountry = item._embedded.venues[2].country.name;
  event.eventCity = item._embedded.venues[0].city.name;
  event.eventTickets = item.url;
  event.eventPicture = item.images[0].url;
  event.eventCategory = item.classifications[0].segment.name;

  return event;
});

// console.log(eventData)

Event.deleteMany({})
  .then(() => Event.create(eventData))
  .then(() => console.log("Done!"))
  .then(() => mongoose.disconnect())
  .catch((error) => console.log("Error", error));

export default mongoose.connection;
