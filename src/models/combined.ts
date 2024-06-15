import mongoose, { Schema, Types } from "mongoose";
import CategoryModel, { Category } from "./categories.model";
import SubCatModel, { SubCategory } from "./subCategories.model";

export interface Combined extends Document {
    category: Category | Types.ObjectId;
    subCategory: SubCategory | Types.ObjectId;
}

const combinedSchema: Schema<Combined> = new Schema<Combined>({
    category: {
        type: Types.ObjectId,
        required: true,
        ref: 'categories',
        autopopulate: true,
    },
    subCategory: {
        type: Types.ObjectId,
        required: true,
        ref: 'subcategories',
        autopopulate: true,
    },
});

// Enable autopopulate for combined schema
combinedSchema.plugin(require('mongoose-autopopulate'));

export const CombinedModel = mongoose.model<Combined>('CombinedModel', combinedSchema);
