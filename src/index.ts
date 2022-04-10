import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import supertokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { initialiseSupertokensAuth } from "./utils/auth";
import apiRoutes from "./routes";

require("dotenv").config();

const websitePort: string | number = process.env.WEBPORT || 3000;
const websiteDomain: string =
  process.env.APP_WEBSITE_URL || `http://localhost:${websitePort}`;
const apiPort: string | number = process.env.PORT || 4000;
const apiDomain: string =
  process.env.APP_API_URL || `http://localhost:${apiPort}`;

initialiseSupertokensAuth(websiteDomain, apiDomain);

const app: Application = express();

app.use(express.json());

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

// TODO: API Routes
app.use("/api", apiRoutes);

app.use(errorHandler());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    message: "Not found",
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.statusCode || 500).json({
    message: error?.message || "Server Error",
  });
});

app.listen(apiPort, () => {
  console.log(`Server is running on port ${apiPort}`);
});
