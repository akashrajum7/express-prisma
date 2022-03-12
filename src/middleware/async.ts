import { Request, Response, NextFunction, Handler } from "express";
import { SessionRequest } from "supertokens-node/framework/express";

export const asyncHandler =
  (
    fn: (
      req: Request | SessionRequest,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request | SessionRequest, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
