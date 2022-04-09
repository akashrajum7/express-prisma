import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { getCurrentUser, updateCurrentUser } from "../controllers/user";

const router = Router();

router.get("/user", verifySession(), getCurrentUser);
router.put("/user", verifySession(), updateCurrentUser);

export default router;
