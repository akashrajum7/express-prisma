import { Response } from "express";
import { asyncHandler } from "../middleware/async";
import { SessionRequest } from "supertokens-node/framework/express";
import { prisma } from "../utils/db";

export const getCurrentUser = asyncHandler(
  async (req: SessionRequest, res: Response) => {
    const session = req.session;
    if (!session) {
      throw Error("Session not found");
    }
    const userId = session.getUserId();
    if (!userId) {
      throw Error("UserId not found");
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw Error("User not found");
    }
    res.status(200).send({
      user: {
        email: user.email,
        bio: user.bio,
        image: user.image,
      },
    });
  }
);
