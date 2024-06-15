import mongoose, { Connection, Mongoose } from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { cls, getCnt } from "./api";
import * as db from "./db1";

dotenv.config();

const app = express();
cls();

//db.dbConnect(process.env.MONGO_URI);
db.connectToDatabase(process.env.MONGU_URI);

//db1.dbConnect(process.env.MONGO_URI);
//db1.connectToDatabase;
app.get("/", async function (req: Request, res: Response, next: NextFunction) {
  const db1: Connection[] = mongoose.connections;
  const collectionNames = db1.forEach;

  if (collectionNames) {
    res.json(collectionNames);
  } else res.json(true);
});

app.listen(8080);
