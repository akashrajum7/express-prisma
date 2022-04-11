import { Response } from "express";
import { SessionRequest } from "supertokens-node/lib/build/framework/express";
import { asyncHandler } from "../middleware/async";
import { ArticleResponse } from "../types/article";
import { prisma } from "../utils/db";

export const getFeedArticles = asyncHandler(
  async (req: SessionRequest, res: Response) => {
    const userId = req.session?.getUserId();
    const take: number = req.query?.limit
      ? parseInt(req.query.limit as string)
      : 20;
    const skip: number = req.query?.offset
      ? parseInt(req.query.offset as string)
      : 0;

    const articlesFromDb = await prisma.article.findMany({
      skip,
      take,
      where: {
        author: {
          followedBy: {
            some: {
              id: userId,
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
      select: {
        slug: true,
        title: true,
        description: true,
        body: true,
        tagList: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        favoritedBy: {
          select: {
            id: true,
          },
        },
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
          },
        },
      },
    });

    const response: ArticleResponse = {
      articles: articlesFromDb.map((article) => {
        let { favoritedBy, ...articleWithoutFavouritedBy } = article;
        return {
          ...articleWithoutFavouritedBy,
          tagList: articleWithoutFavouritedBy.tagList.map((tag) => tag.name),
          favourited: favoritedBy.some((user) => user.id === userId),
          favoritesCount: favoritedBy.length,
          author: {
            ...articleWithoutFavouritedBy.author,
            following: true,
          },
        };
      }),
      articlesCount: articlesFromDb.length,
    };

    res.send(response);
  }
);

export const getRecentArticles = asyncHandler(
  async (req: SessionRequest, res: Response) => {}
);
