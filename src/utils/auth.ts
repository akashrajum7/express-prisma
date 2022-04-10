import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { prisma } from "./db";
import { User } from "@prisma/client";

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
    recipeList: [
      EmailPassword.init({
        signUpFeature: {
          formFields: [
            {
              id: "username",
              validate: async (value) => {
                if (value?.length >= 3) {
                  return undefined; // means that there is no error
                }
                return "User name must be at least 3 characters long";
              },
            },
          ],
        },
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              signUpPOST: async function (input) {
                if (originalImplementation.signUpPOST === undefined) {
                  throw Error("Should never come here");
                }

                // First we call the original implementation of signUpPOST.
                let response = await originalImplementation.signUpPOST(input);

                // Post sign up response, we check if it was successful
                if (response.status === "OK") {
                  let { id, email } = response.user;

                  // // These are the input form fields values that the user used while signing up
                  let formFields = input.formFields;
                  let username: string = formFields.find(
                    (field) => field.id === "username"
                  )?.value as string;
                  // TODO: post sign up logic
                  let user: User = {
                    id,
                    email,
                    username,
                    image: null,
                    bio: null,
                  };
                  try {
                    await prisma.user.create({
                      data: user,
                    });
                  } catch (error) {
                    throw Error("Error creating user in database");
                  }
                }
                return response;
              },
            };
          },
        },
      }),
      Session.init(),
    ],
    isInServerlessEnv: true,
  });
};
