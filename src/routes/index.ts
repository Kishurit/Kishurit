import express, { NextFunction, Request, Response } from "express";
import mongoose, { connection, Connection, model, Model } from "mongoose";

import router from "./routes";
import dbRouter from "./dbRoutes";
import mailRouter from "./mailRoutes";
import { cls, generateRandomText, jsonDB } from "../api";
import * as db from "../db1";
import { categoriesSchema, Category } from "../models/categories.model";
import { writeCatToDB } from "../copyToDB";

const globalRouter: express.Router = express.Router();

globalRouter.use(function (req: Request, res: Response, next: NextFunction) {
  if (
    //req.method.toUpperCase() === "GET" ||
    (req.method.toUpperCase() === "POST" ||
      req.method.toUpperCase() === "PUT" ||
      req.method.toUpperCase() === "DELETE") &&
    req.body.key !== process.env.API_KEY
  )
    res.status(404).json(null);
  else next();
});

// globalRouter.get("/", async function (req, res, next) {
//   try {
//     // var databaseNames = mongoose.connection.useDb("Kishurit1").db.databaseName; //.map(connection => connection.db.databaseName);
//     //var databaseNames = await db1.db.databaseName;
//     //const databaseNames = [await db1.db.databaseName, await db2.db.databaseName];
//     //const databaseNames = mongoose.connections.map((connection) => connection.name);
//     // getCnt("Kishurit")
//     //   .then((data: any) => {
//     //     console.log(data);
//     //     res.json(data);
//     //   })
//     //   .catch((err: any) => {
//     //     console.error(err);
//     //     res.json(err);
//     //   });

//     const Cat = db("Kishurit").model ('Category', categoriesSchema);
//     var Cat1 = new Cat ({name: generateRandomText(3,9), desc: generateRandomText(3,9)});
//     Cat1.save();

//     res.json(Cat1);

//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while retrieving database names." });
//   }
// });

// globalRouter.get(
//   "/",
//   async function (req: Request, res: Response, next: NextFunction) {

//     try {
//       const newCategory = await writeCatToDB(jsonDB);
//       console.log(newCategory);

//       res.json(newCategory);
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while saving the category." });
//     }
//   }
// );

const routes = [globalRouter, dbRouter, mailRouter, router];
export default routes;
