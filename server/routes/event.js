import { Router } from "express";
import * as controllers from "../controllers/event.js";

const router = Router();

//ROUTES
router.get("/:id", controllers.getEvent);
router.get("/", controllers.getEvents);

export default router;
