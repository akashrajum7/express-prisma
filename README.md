
# Express Prisma

This is a sample node.js express application created to test supertokens auth with Prisma orm. We use planetscale as the databse. This API follows real-world specs (https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints), well mostly, except for signup and sign in since they use supertokens.


## Lessons Learned

Q - What did you learn while building this project? What challenges did you face and how did you overcome them?

A - One of the things I realised is that express error handler function should have 4 parameters. I also learnt how to organise code in an express app for scale and also learnt how to integrate supertokens and how to use prisma with node.js. Also experimented with a cool databse called planetscale.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`WEBPORT`

`SUPERTOKENS_URL`

`SUPERTOKENS_API_KEY`

`DATABASE_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/akashrajum7/express-prisma.git
```

Go to the project directory

```bash
  cd express-prisma
```

Install dependencies

```bash
  npm install
```

Start the server locally

```bash
  npm run dev
```


## Deployment

To deploy this project run on the server

```bash
  npm run start
```

## Tech Stack

**Server:** Node, Express, Prisma, Supertokens


## Authors

- [@akashrajum7](https://www.github.com/akashrajum7)


## Feedback

If you have any feedback, please reach out to me at akashrajum7@gmail.com


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://peerlist.io/akashrajum)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akashrajum/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/akashrajum7)


