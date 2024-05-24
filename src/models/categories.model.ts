import mongoose, { Schema, Document, Model, Collection, Connection } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import * as db from "../db1";

export interface Category extends Document {
  name: string;
  desc: string;
}

export const categoriesSchema: Schema<Category> = new Schema<Category>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    unique: true,
    required: false,
  },
});

categoriesSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

const CategoryModel: Model<Category> = mongoose.model<Category>("Category", categoriesSchema);

// export const CatModelWithConn = (connection: Connection): Model<Category> => {
//   return connection.model<Category>("Category", categoriesSchema);
// };

// export const CategoryModel = (): Model<Category> => {
//   return db.default(process.env.DB_NAME).model<Category>("Category", categoriesSchema);
// };


export default CategoryModel;
