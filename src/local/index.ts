import app from "../index";
const apiPort: string | number = process.env.PORT || 4000;

app.listen(apiPort, () => {
  console.log(`Server is running on port ${apiPort}`);
});
