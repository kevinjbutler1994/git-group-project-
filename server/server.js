import db from "./db/connection.js";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
import express from "express";
import allRoutes from "./routes/index.js";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// DEFINE PORT
const PORT = process.env.PORT || 3000;

// ROUTE
app.use("/", allRoutes);

// CONNECT TO DATABASE
db.on("connected", () => {
  console.clear();
  console.log(chalk.cyanBright.bgMagenta("CONNECTED to Mongodb"));

  app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Express server running on port: ${PORT}`));
  });
});
