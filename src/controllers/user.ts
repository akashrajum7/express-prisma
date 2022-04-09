import { Response } from "express";
import { asyncHandler } from "../middleware/async";
import { SessionRequest } from "supertokens-node/framework/express";
import { prisma } from "../utils/db";
import { updateEmailOrPassword } from "supertokens-node/recipe/emailpassword";

export const getCurrentUser = asyncHandler(
  async (req: SessionRequest, res: Response) => {
    const session = req.session;

    const userId = session?.getUserId();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    res.status(200).send({
      user: {
        email: user?.email,
        bio: user?.bio,
        image: user?.image,
      },
    });
  }
);

export const updateCurrentUser = asyncHandler(
  async (req: SessionRequest, res: Response) => {
    const session = req.session;

    const userId = session?.getUserId();

    let user = await prisma.user.findUnique({ where: { id: userId } });

    const { bio, image, email, password, username } = req.body;

    let userDataToUpdateInDb: {
      bio?: string;
      image?: string;
      username?: string;
      email?: string;
    } = {};

    let userDataToUpdateInSupertokens: {
      email?: string;
      password?: string;
      userContext?: any;
      userId: string;
    } = { userId: userId as string };

    if (email) {
      userDataToUpdateInSupertokens.email = email;
      userDataToUpdateInDb.email = email;
    }
    if (password) {
      userDataToUpdateInSupertokens.password = password;
    }
    if (bio) {
      userDataToUpdateInDb.bio = bio;
    }
    if (image) {
      userDataToUpdateInDb.image = image;
    }
    if (username) {
      userDataToUpdateInDb.username = username;
    }

    if (email || password) {
      await updateEmailOrPassword(userDataToUpdateInSupertokens);
    }

    user = await prisma.user.update({
      where: { id: userId },
      data: userDataToUpdateInDb,
    });

    res.status(200).send({
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        image: user.image,
      },
    });
  }
);
