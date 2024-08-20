import express, {Express} from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRoutes from "./routes/api/AuthRoutes";
import postRoutes from "./routes/api/PostRoutes";

dotenv.config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB || "")
  .then(() => {
  console.log("Connected to MongoDB");
})
  .catch((e) => {
  console.log(e);
});

const app: Express = express();
const port = process.env.PORT || 3030;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});