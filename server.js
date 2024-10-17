import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import noteRouter from "./routes/noteRoutes.js";

dotenv.config();
const app = express();
const port = 8080;

app.use(express.json());

app.use("/api/note", noteRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is listening on port ${port}`);
});
