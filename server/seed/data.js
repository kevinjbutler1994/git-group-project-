import Event from "../models/Event.js";
import db from "../db/connections.js";
import data from "./data.json" assert { type: "json" };

const insertData = async () => {
  await db.dropDatabase();

  await Event.create(data);

  console.log("Events are created!");

  await db.close();
};

insertData();
