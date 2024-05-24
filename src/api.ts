import mongoose, { Model, Connection } from "mongoose"; // Import the appropriate type if needed
import * as fs from "fs";
import * as _ from "lodash";

import {
  Categorie,
  SubCategorie,
  Business,
  Location,
  Mail,
  Kishurit,
} from "./types";
import db from "./db1";

interface CountObject {
  [modelName: string]: number;
}

export function cls() {
  console.log(`\x1Bc`);
}

// export const deleteAllCollections = async (): Promise<void> => {
//   const models: Model<any>[] = Object.values(db.models);
//   try {
//     //await db.dropDatabase();
//     for (const model of models) {
//       await model.deleteMany({});
//       await model.remove();
//       console.log(`Deleted collection: ${model.baseModelName}`);
//     }
//   } catch (error) {
//     console.error(`Error deleting collections: ${error}`);
//   }
// };

// export const deleteAllCollections = async (): Promise<void> => {
//   try {
//     await db.dropDatabase();
//     console.log(`Deleted database: ${db.name}`);
//   } catch (error) {
//     console.error(`Error deleting database: ${error}`);
//   }
// };

export const getCnt: (dbName: string) => Promise<CountObject> = async (
  dbName: string
): Promise<CountObject> => {

  const models: Model<any>[] = Object.values(db(dbName).models);

  const counts = await Promise.all(
    models.map(async (model: Model<any>): Promise<CountObject> => {
      const modelName = model.collection.collectionName;
      const cnt = await model.collection.countDocuments();
      return { [modelName]: cnt };
    })
  );

  const countsMerged: CountObject = Object.assign({}, ...counts);
  return countsMerged;
};

const myJsonData = (): Kishurit => {
  try {
    const rawdata: Buffer = fs.readFileSync("./src/db.json");
    const myData: Kishurit = JSON.parse(rawdata.toString());
    fs.closeSync;
    console.log("JSON data has been successfully parsed.");
    return myData;
  } catch (error) {
    console.error(
      "An error occurred while reading or parsing the JSON file:",
      error
    );
    return null;
  }
};

export const jsonDB: Kishurit = myJsonData();

export function generateRandomText(minLength: number, maxLength: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,./<>?;':[]\{}|`~!@#$%^&*()-_=+" + '"';
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const text = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return text;
}