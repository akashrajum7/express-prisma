import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { getCurrentUser, updateCurrentUser } from "../controllers/user";

const router = Router();

router.get("/", verifySession(), getCurrentUser);
router.put("/", verifySession(), updateCurrentUser);

export default router;
