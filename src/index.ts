import * as dotenv from "dotenv";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import nocache from "nocache";
import cors from "cors"; 
import { app } from "./server";
import routes from "./routes";
import * as db from "./db1";
import { cls, generateRandomText } from "./api";
import CategoryModel, { categoriesSchema, Category } from "./models/categories.model";
import { connect } from "mongoose";

dotenv.config();

cls();

const db1 = db.connectToDatabase(process.env.MONGO_URI, process.env.DB_NAME);
// export const dbConnection = {
//   url: process.env.MONGO_URI,
//   options: {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// };

// connect(dbConnection.url);

const options: cors.CorsOptions = {
  allowedHeaders: ["Content-Type"],
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(nocache());
app.use(morgan("dev"));

app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log(new Date().toLocaleTimeString());
  next();
});

routes.forEach((route) => {
  app.use("/", route);
});

app.post("/*", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ status: 404, message: "הדף לא קיים" });
});

app.get("/*", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ status: 404, message: "הדף לא קיים" });
});

export default app;
