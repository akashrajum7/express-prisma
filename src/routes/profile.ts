import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { getProfileByUsername } from "../controllers/profile";

const router = Router();

router.get(
  "/:username",
  verifySession({ sessionRequired: false }),
  getProfileByUsername
);

export default router;
