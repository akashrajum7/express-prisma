import app from "../index";
import ServerlessHttp from "serverless-http";

export const handler = ServerlessHttp(app);
