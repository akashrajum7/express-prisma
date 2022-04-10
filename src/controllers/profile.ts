import { SessionRequest } from "supertokens-node/lib/build/framework/express";
import { NextFunction, Response } from "express";
import { asyncHandler } from "../middleware/async";
import { prisma } from "../utils/db";
import ErrorResponse from "../utils/errorResponse";

export const getProfileByUsername = asyncHandler(
  async (req: SessionRequest, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
    });
    if (!user) {
      throw new ErrorResponse("No user found for the given username", 400);
    }
    const { username, bio, image, id } = user;
    let following = false;
    if (req.session) {
      const userFollowing = await prisma.user.findFirst({
        where: {
          id: req.session.getUserId(),
          following: {
            some: {
              id: id,
            },
          },
        },
      });
      following = !!userFollowing;
    }
    res.status(200).send({
      profile: {
        username,
        bio,
        image,
        following,
      },
    });
  }
);

export const followUserByUsername = asyncHandler(
  async (req: SessionRequest, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
    });
    if (!user) {
      throw new ErrorResponse("No user found for the given username", 400);
    }
    const { id, username, bio, image } = user;
    const userFollowing = await prisma.user.findFirst({
      where: {
        id: req.session?.getUserId(),
        following: {
          some: {
            id: id,
          },
        },
      },
    });
    if (userFollowing) {
      throw new ErrorResponse("User already followed", 400);
    }
    await prisma.user.update({
      where: { id: req.session?.getUserId() },
      data: {
        following: {
          connect: {
            id,
          },
        },
      },
    });
    res.status(200).send({
      username,
      bio,
      image,
      following: true,
    });
  }
);

export const unfollowUserByUsername = asyncHandler(
  async (req: SessionRequest, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
    });
    if (!user) {
      throw new ErrorResponse("No user found for the given username", 400);
    }
    const { id, username, bio, image } = user;
    const userFollowing = await prisma.user.findFirst({
      where: {
        id: req.session?.getUserId(),
        following: {
          some: {
            id: id,
          },
        },
      },
    });
    if (!userFollowing) {
      throw new ErrorResponse("User not followed", 400);
    }
    await prisma.user.update({
      where: { id: req.session?.getUserId() },
      data: {
        following: {
          disconnect: {
            id,
          },
        },
      },
    });
    res.status(200).send({
      username,
      bio,
      image,
      following: false,
    });
  }
);
