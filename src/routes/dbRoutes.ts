import * as fs from "fs";
import express, { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
const dbRouter: express.Router = express.Router();

import {
  Categorie,
  SubCategorie,
  Business,
  Location,
  Mail,
  Kishurit,
} from "../types";

import { cls, jsonDB } from "../api";
import * as db from "../db1";
// import { writeCatToDB, writeSubCatToDB, jsonOfOrgsToDb, writeOrgsToDB, writeOrg1 } from "../copyToDB";
import CategoryModel, { Category } from "../models/categories.model";
import SubCatModel from "../models/subCategories.model";
import { Orgs } from "../models/orgs.model";
import { writeCatToDB, writeCombinedDB, writeOrgsToDB, writeSubCatToDB } from "../copyToDB";



dbRouter.get("/wc1", async function (req: Request, res: Response, next: NextFunction) {
  try {
    writeCatToDB(jsonDB).then(result1 =>
      writeSubCatToDB(jsonDB, result1).then(result2 =>
        writeOrgsToDB(jsonDB, result1, result2).then(result3 =>
          res.json([result1, result2, result3, {
            cat: `cat len ${result1.length}`, subCat: `sub-cat len ${result2.length}`, org: `org len: ${result3.length}`
          }])
          // res.json(result1)
        )
      )
    )
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


dbRouter.get('/wc2', function (req: Request, res: Response, next: NextFunction) {
  CategoryModel.find().maxTimeMS(30000)
    .then(result1 => {
      SubCatModel.find().maxTimeMS(30000)
        .then(result2 =>
          res.json([result1, result2, { cat: `cat len ${result1.length}`, subCat: `sub-cat len ${result2.length}` }])
        )
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// dbRouter.get('/wc3', async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     // const result1 = await CategoryModel.find().maxTimeMS(30000);
//     // const result2 = await SubCatModel.find().maxTimeMS(30000);

//     // const result = await jsonOfOrgsToDb(jsonDB, result1, result2);
//     // const res1 = result.every (e => e.location === ''); 
//     var json: any = {
//       "site_name": "נציב שירות המדינה",
//       "link": "https://www.gov.il/he/service/apply_for_a_civil_service_job_via_tenders_system",
//       "link2": "https://www.gov.il/he/Departments/civil_service_commission",
//       "link3": "https://www.gov.il/he/Departments/publications/?publicationType=0ec5a7ef-977c-459f-8c0a-dcfbe35c8164&drushimStatusType=1&skip=0&limit=10",
//       "facebook_link1": "https://www.facebook.com/Civil.service.Israel",
//       "facebook_link2": "",
//       "facebook_link3": [],
//       "linkedIn_link": "",
//       "email1": "pniyot@csc.gov.il",
//       "email2": "",
//       "tel1": "074-769-9100",
//       "tel2": "",
//       "whatsapp": "",
//       "location": "north"
//     }

//     var result = writeOrg1("מקומות עבודה ציבוריים", "אתרי ממשלה", json);

//     //res.json([result, { orgs: result.length, ok: res1 }]);
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

dbRouter.get('/wc4', function (req: Request, res: Response, next: NextFunction) {
  CategoryModel.find().maxTimeMS(30000)
    .then(result1 => {
      SubCatModel.find().maxTimeMS(30000)
        .then(result2 =>
          writeOrgsToDB(jsonDB, result1, result2).then(result3 =>
            res.json([result3, { cat: `orgs len ${result3.length}` }])
          )
        )
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

dbRouter.get('/wc5', function (req: Request, res: Response, next: NextFunction) {
  SubCatModel.find().maxTimeMS(30000)
    .then(result2 =>
      writeCombinedDB(result2).then(result3 =>
        res.json([result3, { comb: `comb len ${result3.length}` }])
      )
    )

    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

export default dbRouter;
