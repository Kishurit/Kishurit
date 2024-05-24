import * as fs from "fs";
import * as _ from "lodash";
import { Connection, Model, Types } from "mongoose";
import CategoryModel, {
  categoriesSchema,
  Category,
} from "./models/categories.model";
import SubCategoryModel, {
  subCategoriesSchema,
  SubCategory,
  SubCatModel,
} from "./models/subCategories.model";
import OrgsModel, { Orgs } from "./models/orgs.model";
import { Kishurit, Categorie, SubCategorie, Business } from "./types";
import * as db from "./db1";

declare global {
  interface Array<T> {
    filterValues(): T[];
  }
}

const findIdOfCatByName = (arr: Category[], name: string): unknown =>
  arr.find((e) => e.name === name)._id;

const findIdOfSubcatByName = (
  arr: SubCategory[],
  name: string
): unknown => arr.find((e) => e.name === name)._id;

Array.prototype.filterValues = function <T>(this: string[]): string[] {
  return this.filter((val: string) => val !== "" && val !== undefined && val !== null) as string[];
};

Array.prototype.filterValues = function <T>(this: T[]): T[] {
  return this.filter(
    (val: T) => val !== "" && val !== undefined && val !== null
  ) as T[];
};

const jsonOfCat = (jsonDB: Kishurit): Category[] => {
  if (!jsonDB.job) return [];

  return jsonDB.job.map((data: Categorie, i: number) => ({
    name: data.name,
    desc: data.desc.trim() !== "" ? data.desc : String(i),
  })) as Category[];
};

export const jsonOfCatToDB = async (jsonDB: Kishurit) => {
  try {
    return jsonOfCat(jsonDB);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const writeCatToDB = async (jsonDB: Kishurit) => {
  try {
    // var db1 = db.default(process.env.DB_NAME);
    const catObj = jsonOfCat(jsonDB); // Wait for jsOfSubCat to complete
    var newCat = await CategoryModel?.insertMany(catObj);
    console.log("Categories inserted successfully.");
    return newCat;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const jsonOfSubCat = (jsonDB: Kishurit, catCollection: Category[]): SubCategory[] => {
  if (!jsonDB.job) return [];

  return jsonDB.job.flatMap((cat: Categorie, i: number) => {
    const catRefId = findIdOfCatByName(catCollection, cat.name);
    return cat.links
      .map((subCat: SubCategorie, j: number) => {
        return {
          catRefId: catRefId!,
          name: subCat.cat,
          desc: `i: ${i} j: ${j}`,
        };
      })
      .filter(Boolean);
  }) as SubCategory[];
};

export const jsonOfSubCatToDB = async (
  jsonDB: Kishurit,
  catCollection: Category[]
) => {
  try {
    return jsonOfSubCat(jsonDB, catCollection);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const writeSubCatToDB = async (
  jsonDB: Kishurit,
  catCollection: Category[]
) => {
  try {
    //var db1 = db.default(process.env.DB_NAME);
    const subCatObj = jsonOfSubCat(jsonDB, catCollection); // Wait for jsOfSubCat to complete
    var newSubCat = await SubCatModel?.insertMany(subCatObj);
    console.log("Subcategories inserted successfully.");
    return newSubCat;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to ensure proper error handling
  }
};


const jsonOfOrgs = (
  jsonDB: Kishurit,
  catCollection: Category[],
  subcatCollection: SubCategory[]
) => {
  if (!jsonDB.job) return [];

  return jsonDB.job.flatMap((cat: Categorie, i: number) => {
    const catRefId = findIdOfCatByName(catCollection, cat.name);
    return cat.links.flatMap((subCat: SubCategorie, j: number) => {
      const subcatRefId = findIdOfSubcatByName(subcatCollection, subCat.cat);
      return subCat.links.flatMap((org: Business, k: number) => {
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

export const jsonOfOrgsToDb = (
  jsonDB: Kishurit,
  catCollection: Category[],
  subcatCollection: SubCategory[]
) => {
  try {
    return jsonOfOrgs(jsonDB, catCollection, subcatCollection);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const writeOrgsToDB = async (jsonDB: Kishurit,
  catCollection: Category[],
  subcatCollection: SubCategory[]
) => {
  try {
    // var db1 = db.default(process.env.DB_NAME);
    const orgsObj = jsonOfOrgs(jsonDB, catCollection, subcatCollection);
    var newOrg = await OrgsModel?.insertMany(orgsObj);
    console.log("Orgs inserted successfully.");
    return newOrg;


    // return await OrgsModel.insertMany(jsonOfOrgs(jsonDB, catCollection, subcatCollection));
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const writeOrg1 = async (
  catName: string,
  subCatName: string,
  json: Business
) => {

  const subcatRefId = (await SubCatModel.find({ name: subCatName }));
  const catRefId = subcatRefId[0].catRefId._id;
  console.log(catRefId);
  console.log(subcatRefId[0]);
  const newCat = new OrgsModel({
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
  })
  return newCat.save();
};


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
