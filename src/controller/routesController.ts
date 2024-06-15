import { NextFunction, Request, Response } from "express";
import SubCategoryModel, { SubCategory } from "../models/subCategories.model";
import OrgsModel, { Orgs } from "../models/orgs.model";
import { CombinedModel } from "../models/combined";
import CategoryModel, { Category } from "../models/categories.model";

const verifyData = (data: any, res: Response, next: NextFunction): void => {
  !data ? next() : res.json(data);
};

export const findOrgsByColAndCnt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrgsModel.aggregate([
      {
        $group: {
          _id: "$catRefId", // Group by catRefId
          count: { $sum: 1 } // Count documents in each group
        }
      },
      {
        $lookup: {
          from: "categories", // Name of the collection
          localField: "_id",
          foreignField: "_id",
          as: "categories"
        }
      },
      {
        $project: {
          totNum: "$count", // Rename the count field to totNum
          name: { $arrayElemAt: ["$categories.name", 0] } // Assuming there's a field 'name' in CategoryModel
        }
      },
      {
        $sort: {
          "name": 1 // Sort by categoryName in ascending order
        }
      }
    ]);

    const cnt = result.reduce((acc, cur) => {
      return acc + cur.totNum;
    }, 0)

    verifyData({ total: cnt, cat: result }, res, next);
  }

  catch (error) {
    console.error('Error counting documents:', error);
    throw error;
  }

}

export const findOrgsByCatId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: String = req.params.id;
    if (id === "null" || id === "undefined") return res.json([]);
    
    // const json = jsonDB.job[15];

    const cat: Category = await CategoryModel.findById(id);
    //console.log (cat);
    // const subCats: SubCategory[] = await SubCategoryModel.find({ catRefId: cat._id });
    //console.log(subCats);
    // console.log(json);

    // const data: any = {
    //   name: cat.name, desc: cat.desc, links: [
    //     ...orgs

    //   ]
    // }
    // const data: any = { ot: "!@"};
    const orgs: Orgs[] = await OrgsModel.find({ catRefId: cat._id }).populate("subCatRefId")
    type dataType = {
      name: string,
      desc: string,
      links: {
        cat: string,
        desc?: string
        links: Orgs[]
      }[]
    };

    var data: dataType = { name: cat.name, desc: cat.desc, links: [] }
    for (const org of orgs) {
      const index = data.links.findIndex(item => item.cat === org.subCatRefId.name);
      if (index == -1) data.links.push({ desc: org.subCatRefId.desc, cat: org.subCatRefId.name, links: [org] })
      else data.links[index].links.push(org);
    }

    verifyData(data, res, next);
  }
  catch (err) {
    res.status(404).json(err);
  }
}

// export const findColsSubColsAndOrgs = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // const result: Orgs[] = await OrgsModel.find()
//     const result = await OrgsModel.aggregate([
//       {
//         $group: {
//           _id: "$catRefId", // Group by catRefId
//           count: { $sum: 1 } // Count documents in each group
//         }
//       },
//       {
//         $lookup: {
//           from: "categories", // Name of the collection
//           localField: "_id",
//           foreignField: "_id",
//           as: "categories"
//         }
//       },
//       {
//         $project: {
//           totNum: "$count", // Rename the count field to totNum
//           name: { $arrayElemAt: ["$categories.name", 0] } // Assuming there's a field 'name' in CategoryModel
//         }
//       },
//       {
//         $sort: {
//           "name": 1 // Sort by categoryName in ascending order
//         }
//       }
//     ]);

//     console.log(result);

//     const cnt = result.reduce((acc, cur) => {
//       return acc + cur.totNum;
//     }, 0)

//     verifyData({ total: cnt, cat: result }, res, next);
//   }

//   catch (error) {
//     console.error('Error counting documents:', error);
//     throw error;
//   }

// }