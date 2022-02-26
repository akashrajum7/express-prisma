import express, { Request, Response, Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";

require("dotenv").config();

const apiPort = process.env.PORT || 4000;
const apiDomain = process.env.APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.WEBPORT || 3000;
const websiteDomain =
  process.env.APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_URL || "",
    apiKey: process.env.SUPERTOKENS_API_KEY,
  },
  appInfo: {
    appName: "Express Prisma",
    apiDomain,
    websiteDomain,
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

const app: Application = express();

app.use(
  cors({
    origin: websiteDomain, // TODO: Change to your app's website domain
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(middleware());

app.use(errorHandler());

app.use((error: any, req: Request, res: Response) => {
  res.status(error?.statusCode || 500).json({
    success: false,
    error: error?.message || "Server Error",
  });
});

const port: string | number = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
