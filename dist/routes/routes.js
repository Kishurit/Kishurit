"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const express_1 = __importDefault(require("express"));
const api_1 = require("../api");
const routesController_1 = require("../controller/routesController");
const router = express_1.default.Router();
const verifyData = (data, res, next) => {
    !data ? next() : res.json(data);
};
router.get("/", async function (req, res, next) {
    await (0, routesController_1.findOrgsByColAndCnt)(req, res, next);
});
router.post("/search", (req, res) => {
    const { location, searchText } = req.body;
    let processedSearchText = searchText.toLowerCase();
    const searchData = api_1.jsonDB.job.reduce((a1, c1) => {
        const categoryLinks = c1.links.reduce((a2, c2) => {
            const subArr = c2.links.filter((e) => {
                return (e.site_name.toLowerCase().includes(processedSearchText) &&
                    (location === "" || e.location === location));
            });
            if (subArr.length > 0) {
                return [...a2, { cat: c2.cat, links: subArr }];
            }
            else {
                return a2;
            }
        }, []);
        return [...a1, ...categoryLinks];
    }, []);
    return res.json({ links: searchData });
});
router.post("/catNames", function (req, res, next) {
    res.json(api_1.jsonDB.job.map((e) => e.name));
});
router.post("/totalNum", function (req, res, next) {
    const totalNum = api_1.jsonDB.job.reduce((acc, element) => acc +
        element.links.reduce((acc1, element1) => acc1 + element1.links.length, 0), 0);
    res.json(totalNum);
});
router.post("/", async function (req, res, next) {
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
    await (0, routesController_1.findOrgsByColAndCnt)(req, res, next);
    // verifyData(data, res, next);
});
router.post("/:id/catName", function (req, res, next) {
    verifyData(api_1.jsonDB.job[req.params.id].links.map((e) => e.cat), res, next);
});
router.post("/:id/catTotalNum", function (req, res, next) {
    verifyData(api_1.jsonDB.job[req.params.id].links.reduce((acc1, element1) => acc1 + element1.links.length, 0), res, next);
});
router.post("/:id", async function (req, res, next) {
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
    await (0, routesController_1.findOrgsByCatId)(req, res, next);
});
router.post("/:id1/:id2/subCatTotalNum", function (req, res, next) {
    verifyData(api_1.jsonDB.job[req.params.id1].links[req.params.id2].links.length, res, next);
});
router.post("/:id1/:id2", function (req, res, next) {
    verifyData(api_1.jsonDB.job[req.params.id1].links[req.params.id2], res, next);
});
router.post("/:id1/:id2/:id3", function (req, res, next) {
    verifyData(api_1.jsonDB.job[req.params.id1].links[req.params.id2].links[req.params.id3], res, next);
});
exports.default = router;
//# sourceMappingURL=routes.js.map