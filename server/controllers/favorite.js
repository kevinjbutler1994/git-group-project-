import Favorite from "../models/Favorite.js";
import jwt from "jsonwebtoken";

export const getFavorites = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization token not provided" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decoded.id;

    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createFavorite = async (req, res) => {
  try {
    const { eventId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization token not provided" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decoded.id;

    const favorite = await Favorite.create({ eventId, userId });
    // Save the new category to the database
    await favorite.save();

    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const deleted = await Favorite.findByIdAndDelete(favoriteId);
    if (deleted) {
      return res.status(200).send("Event deleted");
    }
    throw new Error("Event not found");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
