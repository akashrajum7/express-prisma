import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { getCurrentUser } from "../controllers/user";

const router = Router();

router.get("/user", verifySession(), getCurrentUser);

export default router;
