import CategoryModel, { Category } from "../models/categories.model";

export const categoriesData = () => {
  CategoryModel
    .find()
    .then((data: Category[]) => {
      const categoryNames = data.map((info: Category) => info.name);
      console.log(categoryNames); 
    })
    .catch((err: Error) => console.log(err));
};
