import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import auth from "./routes/api/auth";

dotenv.config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB || "")
  .then(r => {
  console.log("Connected to MongoDB");
})
  .catch((e) => {
  console.log(e);
});

const app: Express = express();
const port = process.env.PORT || 3030;
app.use(express.json());

app.use("/api/auth", auth);



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});