import app from "./dist/index";

const apiPort = process.env.PORT || 4000;

app.listen(apiPort, () => {
  console.log(`Server is running on port ${apiPort}`);
});
