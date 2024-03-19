import { Router } from "express";
import authRoutes from "./auth.js";
import eventRoutes from "./event.js";
import favoriteRoutes from "./favorite.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the root")); //This is our landing page

router.use("/auth", authRoutes); //authRoutes - will contain /auth/register, /auth/login
router.use("/events", eventRoutes);
router.use("/favorite", favoriteRoutes);

export default router;
