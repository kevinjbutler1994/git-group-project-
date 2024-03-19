import fs from "fs/promises";
import fetch from "node-fetch";
import dotenv from "dotenv";

/* CONFIGURATIONS */
dotenv.config();

async function getEvents() {
  const currentEventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${process.env.API_KEY}&size=10`;

  try {
    const response = await fetch(currentEventUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    await fs.writeFile("./data.json", JSON.stringify(data));
    console.log("Events data saved successfully");
  } catch (error) {
    console.error("Error fetching events:", error.message);
    // Handle the error appropriately, such as logging or sending a response to the client
  }
}

getEvents();
