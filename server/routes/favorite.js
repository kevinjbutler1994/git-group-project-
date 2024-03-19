import { Router } from "express";
import * as controllers from "../controllers/favorite.js";

const router = Router();

//ROUTES
router.get("/", controllers.getFavorites);
router.post("/add/:eventId", controllers.createFavorite);
router.delete("/remove/:favoriteId", controllers.updateFavorite);

export default router;
