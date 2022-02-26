import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";

export const initialiseSupertokensAuth = (
  websiteDomain: string,
  apiDomain: string
): void => {
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
};
