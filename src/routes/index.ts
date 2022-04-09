import { Router } from "express";
import userRoutes from "./user";
import profileRoutes from "./profile";

const router = Router();

router.use("/user", userRoutes);
router.use("/profiles", profileRoutes);

export default router;
