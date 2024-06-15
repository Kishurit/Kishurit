"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbRouter = express_1.default.Router();
const api_1 = require("../api");
// import { writeCatToDB, writeSubCatToDB, jsonOfOrgsToDb, writeOrgsToDB, writeOrg1 } from "../copyToDB";
const categories_model_1 = __importDefault(require("../models/categories.model"));
const subCategories_model_1 = __importDefault(require("../models/subCategories.model"));
const copyToDB_1 = require("../copyToDB");
dbRouter.get("/wc1", async function (req, res, next) {
    try {
        (0, copyToDB_1.writeCatToDB)(api_1.jsonDB).then(result1 => (0, copyToDB_1.writeSubCatToDB)(api_1.jsonDB, result1).then(result2 => (0, copyToDB_1.writeOrgsToDB)(api_1.jsonDB, result1, result2).then(result3 => res.json([result1, result2, result3, {
                cat: `cat len ${result1.length}`, subCat: `sub-cat len ${result2.length}`, org: `org len: ${result3.length}`
            }])
        // res.json(result1)
        )));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
dbRouter.get('/wc2', function (req, res, next) {
    categories_model_1.default.find().maxTimeMS(30000)
        .then(result1 => {
        subCategories_model_1.default.find().maxTimeMS(30000)
            .then(result2 => res.json([result1, result2, { cat: `cat len ${result1.length}`, subCat: `sub-cat len ${result2.length}` }]));
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
dbRouter.get('/wc4', function (req, res, next) {
    categories_model_1.default.find().maxTimeMS(30000)
        .then(result1 => {
        subCategories_model_1.default.find().maxTimeMS(30000)
            .then(result2 => (0, copyToDB_1.writeOrgsToDB)(api_1.jsonDB, result1, result2).then(result3 => res.json([result3, { cat: `orgs len ${result3.length}` }])));
    })
        .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
});
dbRouter.get('/wc5', function (req, res, next) {
    subCategories_model_1.default.find().maxTimeMS(30000)
        .then(result2 => (0, copyToDB_1.writeCombinedDB)(result2).then(result3 => res.json([result3, { comb: `comb len ${result3.length}` }])))
        .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
});
exports.default = dbRouter;
//# sourceMappingURL=dbRoutes.js.map