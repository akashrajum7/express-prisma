import express, { Request, Response, Application } from "express";

require("dotenv").config();

const app: Application = express();

const port: string | number = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
