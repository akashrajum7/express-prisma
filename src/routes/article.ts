import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const router = Router();

router.get("/feed", verifySession);

export default router;
