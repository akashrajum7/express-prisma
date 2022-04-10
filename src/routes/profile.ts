import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import {
  followUserByUsername,
  getProfileByUsername,
  unfollowUserByUsername,
} from "../controllers/profile";

const router = Router();

router.get(
  "/:username",
  verifySession({ sessionRequired: false }),
  getProfileByUsername
);

router.post("/:username/follow", verifySession(), followUserByUsername);

router.delete("/:username/follow", verifySession(), unfollowUserByUsername);

export default router;
