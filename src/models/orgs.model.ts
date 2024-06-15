import mongoose, { Document, Model, Schema, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Category } from "./categories.model";
import { SubCategory } from "./subCategories.model";

interface Tel {
  tel: string;
  owner?: string;
}

type Location = "" | "north" | "south" | "center" | "yosh" | "website";

interface Snif {
  name?: String;
  tel: Tel[];
  whatsapp?: Tel[];
  email?: string[];
  location: Location;
  city: string;
  address: string;
};

export interface Orgs extends Document {
  catRefId: Category & Types.ObjectId;
  subCatRefId: SubCategory & Types.ObjectId;
  org_name: string;
  desc?: string;
  web_link: string[];
  facebook_link: string[];
  linkedIn_link?: string[];
  instagram_link?: string[];
  email: string[];
  tel: Tel[];
  whatsapp?: Tel[];
  location: Location;
  address?: String;
  snifim?: Snif[];
  active: Boolean;
}

const telSchema = new mongoose.Schema<Tel>({
  tel: { type: String, required: true },
  owner: { type: String, required: false }
}, { _id: false });

const whatsappSchema = new mongoose.Schema<Tel>({
  tel: { type: String, required: false },
  owner: { type: String, required: false }
}, { _id: false });

const snifSchema = new Schema<Snif>({
  name: { type: String },
  tel: { type: [telSchema], required: true },
  whatsapp: [whatsappSchema],
  email: [String],
  location: { type: String, enum: ["", "north", "south", "center", "yosh", "website"], default: "" },
  city: { type: String, required: true },
  address: { type: String, required: true }
}, { _id: false });

const orgSchema = new Schema<Orgs>({
  catRefId: { type: Schema.Types.ObjectId, required: true, ref: "categories" },
  subCatRefId: { type: Schema.Types.ObjectId, required: true, ref: "subcategories" },
  org_name: { type: String, required: true },
  desc: { type: String },
  web_link: { type: [String], default: [] },
  facebook_link: { type: [String], default: [] },
  linkedIn_link: { type: [String], default: [] },
  instagram_link: { type: [String], default: [] },
  email: { type: [String] },
  tel: { type: [telSchema], required: true },
  whatsapp: [whatsappSchema],
  location: { type: String, enum: ["", "north", "south", "center", "yosh", "website"], default: "" },
  address: { type: String },
  snifim: [
    {
      type: [snifSchema],
      required: false,
    },
  ],
  active: { type: Boolean, default: false },
});

orgSchema.plugin(uniqueValidator, "Error, expected {PATH} to be unique.");
orgSchema.plugin(mongooseAutoPopulate);

const OrgsModel: Model<Orgs> = mongoose.model<Orgs>("orgs", orgSchema);

export default OrgsModel;
