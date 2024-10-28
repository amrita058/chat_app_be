import express from "express";
import routes from "./routes/index";
import { connectDB } from "./database";
import { env } from "./config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use("/api/v1/", routes);

app.listen(env.PORT, () => {
  console.log(`listening at port ${env.PORT}`);
});
