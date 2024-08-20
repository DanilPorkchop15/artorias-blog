import express, {Express} from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import AuthRoutes from "./routes/api/AuthRoutes";
import PostRoutes from "./routes/api/PostRoutes";
import StorageRoutes from "./routes/api/StorageRoutes";

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
app.use("/api/auth", AuthRoutes);
app.use("/api/posts",PostRoutes);
app.use("/api/upload", express.static("src/uploads") );
app.use('/api/upload', StorageRoutes);

app.listen(port, () => {
  console.log(`
  
░░      ░░░       ░░░        ░░░      ░░░       ░░░        ░░░      ░░░░      ░░
▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒
▓  ▓▓▓▓  ▓▓       ▓▓▓▓▓▓  ▓▓▓▓▓  ▓▓▓▓  ▓▓       ▓▓▓▓▓▓  ▓▓▓▓▓  ▓▓▓▓  ▓▓▓      ▓▓
█        ██  ███  ██████  █████  ████  ██  ███  ██████  █████        ████████  █
█  ████  ██  ████  █████  ██████      ███  ████  ██        ██  ████  ███      ██
                                                                             
  ⚡️[server]: Server is running at http://localhost:${port}`);
});