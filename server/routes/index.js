import { Router } from "express";
import authRoutes from "./auth.js";
// import categoryRoutes from "./category.js";
// import counterRoutes from "./counter.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the root")); //This is our landing page

router.use("/auth", authRoutes); //authRoutes - will contain /auth/register, /auth/login
// router.use("/events", categoryRoutes);
// router.use("/favorite", counterRoutes);

export default router;
