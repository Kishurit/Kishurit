import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import { cls, jsonDB } from "../api";
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
import SubCategoryModel, { SubCategory } from "../models/subCategories.model";
import CategoryModel, { Category } from "../models/categories.model";
import { findOrgsByCatId, findOrgsByColAndCnt } from "../controller/routesController";

const router: express.Router = express.Router();
const verifyData = (data: any, res: Response, next: NextFunction): void => {
  !data ? next() : res.json(data);
};


router.get("/", async function (req: Request, res: Response, next: NextFunction) {
  await findOrgsByColAndCnt(req, res, next)
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

router.post("/", async function (req: Request, res: Response, next: NextFunction) {
  // type Data = {
  //   total: number;
  //   cat: { name: string; totNum: number }[];
  // };

  // const data = jsonDB.job.reduce(
  //   (acc: Data, element: Categorie) => {
  //     const totalCatNum = element.links.reduce(
  //       (acc1, element1) => acc1 + element1.links.length,
  //       0
  //     );
  //     acc.total += totalCatNum;
  //     acc.cat.push({ name: element.name, totNum: totalCatNum });
  //     return acc;
  //   },
  //   { total: 0, cat: [] }
  // );
  await findOrgsByColAndCnt(req, res, next)

  // verifyData(data, res, next);
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

router.post("/:id", async function (req: Request, res: Response, next: NextFunction) {
  // cls();

  // try {
  //   const id: String = req.params.id;
  //   if (id === "null" || id === "undefined") return res.json([]);

  //   const json = jsonDB.job[15];

  //   const cat: Category = await CategoryModel.findById(id);
  //   //console.log (cat);
  //   // const subCats: SubCategory[] = await SubCategoryModel.find({ catRefId: cat._id });
  //   //console.log(subCats);
  //   // console.log(json);

  //   // const data: any = {
  //   //   name: cat.name, desc: cat.desc, links: [
  //   //     ...orgs

  //   //   ]
  //   // }
  //   // const data: any = { ot: "!@"};
  //   const orgs: Orgs[] = await OrgsModel.find({ catRefId: cat._id }).populate("subCatRefId")
  //   type dataType = {
  //     name: string,
  //     desc: string,
  //     links: {
  //       cat: string,
  //       desc?: string
  //       links: Orgs[]
  //     }[]
  //   };

  //   var data: dataType = { name: cat.name, desc: cat.desc, links: [] }
  //   for (const org of orgs) {
  //     const index = data.links.findIndex(item => item.cat === org.subCatRefId.name);
  //     if (index == -1) data.links.push({ desc: org.subCatRefId.desc, cat: org.subCatRefId.name, links: [org] })
  //     else data.links[index].links.push(org);
  //   }


  //   // console.log(data);

  //   verifyData(data, res, next);
  //   //res.json([json, data]);
  // }
  // catch (err) {
  //   res.status(404).json(err);
  // }
  await findOrgsByCatId(req, res, next);
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