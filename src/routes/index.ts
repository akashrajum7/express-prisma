import { Router } from "express";
import userRoutes from "./user";
import profileRoutes from "./profile";
import articleRoutes from "./article";

const router = Router();

router.use("/user", userRoutes);
router.use("/profiles", profileRoutes);
router.use("/articles", articleRoutes);

export default router;
