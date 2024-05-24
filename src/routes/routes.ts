import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import { jsonDB } from "../api";
import {
  Categorie,
  SubCategorie,
  Business,
  Location,
  Mail,
  Kishurit,
} from "../types";
import OrgsModel, { Orgs } from "../models/orgs.model";
import { Schema } from "mongoose"
import { SubCatModel, SubCategory } from "../models/subCategories.model";
import CategoryModel from "../models/categories.model";
import { findCollection } from "../controller/routesController";

const router: express.Router = express.Router();
const verifyData = (data: any, res: Response, next: NextFunction): void => {
  !data ? next() : res.json(data);
};


router.get("/", async function (req: Request, res: Response, next: NextFunction) {
  findCollection (req, res, next)
});

router.post("/search", (req: Request, res: Response) => {
  const { location, searchText } = req.body as {
    location: Location;
    searchText: string;
  };
  let processedSearchText = searchText.toLowerCase();

  const searchData: SubCategorie[] = jsonDB.job.reduce(
    (a1: SubCategorie[], c1: Categorie) => {
      const categoryLinks: SubCategorie[] = c1.links.reduce(
        (a2: SubCategorie[], c2: SubCategorie) => {
          const subArr = c2.links.filter((e: Business) => {
            return (
              e.site_name.toLowerCase().includes(processedSearchText) &&
              (location === "" || e.location === location)
            );
          });

          if (subArr.length > 0) {
            return [...a2, { cat: c2.cat, links: subArr }];
          } else {
            return a2;
          }
        },
        []
      );

      return [...a1, ...categoryLinks];
    },
    []
  );

  return res.json({ links: searchData });
});

router.post(
  "/catNames",
  function (req: Request, res: Response, next: NextFunction) {
    res.json(jsonDB.job.map((e: Categorie) => e.name));
  }
);


router.post(
  "/totalNum",
  function (req: Request, res: Response, next: NextFunction) {
    const totalNum = jsonDB.job.reduce(
      (acc: number, element: Categorie) =>
        acc +
        element.links.reduce(
          (acc1: number, element1: SubCategorie) =>
            acc1 + element1.links.length,
          0
        ),
      0
    );
    res.json(totalNum);
  }
);

router.post("/", function (req: Request, res: Response, next: NextFunction) {
  type Data = {
    total: number;
    cat: { name: string; totNum: number }[];
  };

  const data = jsonDB.job.reduce(
    (acc: Data, element: Categorie) => {
      const totalCatNum = element.links.reduce(
        (acc1, element1) => acc1 + element1.links.length,
        0
      );
      acc.total += totalCatNum;
      acc.cat.push({ name: element.name, totNum: totalCatNum });
      return acc;
    },
    { total: 0, cat: [] }
  );

  verifyData(data, res, next);
});

router.post(
  "/:id/catName",
  function (req: Request, res: Response, next: NextFunction) {
    verifyData(
      jsonDB.job[req.params.id].links.map((e: SubCategorie) => e.cat),
      res,
      next
    );
  }
);

router.post("/:id/catTotalNum", function (req, res, next) {
  verifyData(
    jsonDB.job[req.params.id].links.reduce(
      (acc1: number, element1: SubCategorie) => acc1 + element1.links.length,
      0
    ),
    res,
    next
  );
});

router.post("/:id", function (req: Request, res: Response, next: NextFunction) {
  verifyData(jsonDB.job[req.params.id], res, next);
});

router.post(
  "/:id1/:id2/subCatTotalNum",
  function (req: Request, res: Response, next: NextFunction) {
    verifyData(
      jsonDB.job[req.params.id1].links[req.params.id2].links.length,
      res,
      next
    );
  }
);

router.post(
  "/:id1/:id2",
  function (req: Request, res: Response, next: NextFunction) {
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2], res, next);
  }
);

router.post(
  "/:id1/:id2/:id3",
  function (req: Request, res: Response, next: NextFunction) {
    verifyData(
      jsonDB.job[req.params.id1].links[req.params.id2].links[req.params.id3],
      res,
      next
    );
  }
);

export default router;
