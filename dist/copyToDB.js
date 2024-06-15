"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOrg1 = exports.writeCombinedDB = exports.writeOrgsToDB = exports.jsonOfOrgsToDb = exports.writeSubCatToDB = exports.jsonOfSubCatToDB = exports.writeCatToDB = exports.jsonOfCatToDB = void 0;
const categories_model_1 = __importDefault(require("./models/categories.model"));
const subCategories_model_1 = __importDefault(require("./models/subCategories.model"));
const orgs_model_1 = __importDefault(require("./models/orgs.model"));
const combined_1 = require("./models/combined");
const findIdOfCatByName = (arr, name) => arr.find((e) => e.name === name)._id;
const findIdOfSubcatByName = (arr, name) => arr.find((e) => e.name === name)._id;
Array.prototype.filterValues = function () {
    return this.filter((val) => val !== "" && val !== undefined && val !== null);
};
Array.prototype.filterValues = function () {
    return this.filter((val) => val !== "" && val !== undefined && val !== null);
};
const jsonOfCat = (jsonDB) => {
    if (!jsonDB.job)
        return [];
    return jsonDB.job.map((data, i) => ({
        name: data.name,
        desc: data.desc.trim() !== "" ? data.desc : String(i),
    }));
};
const jsonOfCatToDB = async (jsonDB) => {
    try {
        return jsonOfCat(jsonDB);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.jsonOfCatToDB = jsonOfCatToDB;
const writeCatToDB = async (jsonDB) => {
    try {
        // var db1 = db.default(process.env.DB_NAME);
        const catObj = jsonOfCat(jsonDB); // Wait for jsOfSubCat to complete
        var newCat = await categories_model_1.default?.insertMany(catObj);
        console.log("Categories inserted successfully.");
        return newCat;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.writeCatToDB = writeCatToDB;
const jsonOfSubCat = (jsonDB, catCollection) => {
    if (!jsonDB.job)
        return [];
    return jsonDB.job.flatMap((cat, i) => {
        const catRefId = findIdOfCatByName(catCollection, cat.name);
        return cat.links
            .map((subCat, j) => {
            return {
                catRefId: catRefId,
                name: subCat.cat,
                desc: `i: ${i} j: ${j}`,
            };
        })
            .filter(Boolean);
    });
};
const jsonOfSubCatToDB = async (jsonDB, catCollection) => {
    try {
        return jsonOfSubCat(jsonDB, catCollection);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.jsonOfSubCatToDB = jsonOfSubCatToDB;
const writeSubCatToDB = async (jsonDB, catCollection) => {
    try {
        //var db1 = db.default(process.env.DB_NAME);
        const subCatObj = jsonOfSubCat(jsonDB, catCollection); // Wait for jsOfSubCat to complete
        var newSubCat = await subCategories_model_1.default?.insertMany(subCatObj);
        console.log("Subcategories inserted successfully.");
        return newSubCat;
    }
    catch (error) {
        console.error(error);
        throw error; // Rethrow the error to ensure proper error handling
    }
};
exports.writeSubCatToDB = writeSubCatToDB;
const jsonOfOrgs = (jsonDB, catCollection, subcatCollection) => {
    if (!jsonDB.job)
        return [];
    return jsonDB.job.flatMap((cat, i) => {
        const catRefId = findIdOfCatByName(catCollection, cat.name);
        return cat.links.flatMap((subCat, j) => {
            const subcatRefId = findIdOfSubcatByName(subcatCollection, subCat.cat);
            return subCat.links.flatMap((org, k) => {
                return {
                    catRefId: catRefId,
                    subCatRefId: subcatRefId,
                    org_name: org.site_name,
                    web_link: [org.link, org.link2, org.link3].filter(link => link),
                    facebook_link: [
                        org.facebook_link1,
                        org.facebook_link2,
                        ...org.facebook_link3,
                    ].filter(link => link),
                    linkedIn_link: [org.linkedIn_link].filter(link => link),
                    instagram_link: [org.instagram_link].filter(link => link),
                    tel: [{ tel: org.tel1 }, { tel: org.tel2 }].filter(link => link.tel),
                    email: [org.email1, org.email2].filter(link => link),
                    whatsapp: [{ tel: org.whatsapp }].filter(link => link.tel),
                    location: org?.location ? org.location : "",
                    active: true,
                };
            });
        });
    });
};
const jsonOfOrgsToDb = (jsonDB, catCollection, subcatCollection) => {
    try {
        return jsonOfOrgs(jsonDB, catCollection, subcatCollection);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.jsonOfOrgsToDb = jsonOfOrgsToDb;
const writeOrgsToDB = async (jsonDB, catCollection, subcatCollection) => {
    try {
        // var db1 = db.default(process.env.DB_NAME);
        const orgsObj = jsonOfOrgs(jsonDB, catCollection, subcatCollection);
        var newOrg = await orgs_model_1.default?.insertMany(orgsObj);
        console.log("Orgs inserted successfully.");
        return newOrg;
        // return await OrgsModel.insertMany(jsonOfOrgs(jsonDB, catCollection, subcatCollection));
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.writeOrgsToDB = writeOrgsToDB;
const writeCombinedDB = async (subcatCollection) => {
    try {
        const combinedData = subcatCollection.map((subCat) => ({
            category: subCat.catRefId._id,
            subCategory: subCat._id,
        }));
        const newCombined = await combined_1.CombinedModel.insertMany(combinedData);
        console.log("Combined data inserted successfully.");
        return newCombined;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.writeCombinedDB = writeCombinedDB;
const writeOrg1 = async (catName, subCatName, json) => {
    const subcatRefId = (await subCategories_model_1.default.find({ name: subCatName }));
    const catRefId = subcatRefId[0].catRefId._id;
    console.log(catRefId);
    console.log(subcatRefId[0]);
    const newCat = new orgs_model_1.default({
        catRefId: catRefId,
        subCatRefId: subcatRefId[0]._id,
        org_name: json.site_name,
        web_link: [json?.link, json.link2],
        facebook_link: [json?.facebook_link1, json.facebook_link2],
        instagram_link: [json.instagram_link],
        linkedIn_link: [json.linkedIn_link],
        tel: [json.tel1, json?.tel2],
        email: [json.email1, json?.email2],
        location: "",
    });
    return newCat.save();
};
exports.writeOrg1 = writeOrg1;
// const jsonOfSubCat = async (
//   jsonDB: Kishurit,
//   catCollection: Category[]
// ): Promise<SubCategory[]> => {
//   const subCatObj: SubCategory[] = _.cloneDeep(jsonDB).job.reduce(
//     (accumulator: SubCategory[], cat: Categorie) => {
//       const subCategories: SubCategory[] = cat.links.reduce(
//         (accumulator1: any[], subCat: SubCategorie, j) => {
//           const catRefId = findIdByName(catCollection, cat.name);
//           if (catRefId) {
//             accumulator1.push({
//               catRefId,
//               name: subCat.cat,
//               desc: String(accumulator.length + j),
//             });
//           }
//           return accumulator1;
//         },
//         []
//       );
//       accumulator = [...accumulator, ...subCategories];
//       return accumulator;
//     },
//     []
//   );
//   console.log("jsonOfSubCat");
//   return subCatObj;
// };
//# sourceMappingURL=copyToDB.js.map