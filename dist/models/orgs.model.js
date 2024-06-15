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
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
;
const telSchema = new mongoose_1.default.Schema({
    tel: { type: String, required: true },
    owner: { type: String, required: false }
}, { _id: false });
const whatsappSchema = new mongoose_1.default.Schema({
    tel: { type: String, required: false },
    owner: { type: String, required: false }
}, { _id: false });
const snifSchema = new mongoose_1.Schema({
    name: { type: String },
    tel: { type: [telSchema], required: true },
    whatsapp: [whatsappSchema],
    email: [String],
    location: { type: String, enum: ["", "north", "south", "center", "yosh", "website"], default: "" },
    city: { type: String, required: true },
    address: { type: String, required: true }
}, { _id: false });
const orgSchema = new mongoose_1.Schema({
    catRefId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "categories" },
    subCatRefId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "subcategories" },
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
orgSchema.plugin(mongoose_unique_validator_1.default, "Error, expected {PATH} to be unique.");
orgSchema.plugin(mongoose_autopopulate_1.default);
const OrgsModel = mongoose_1.default.model("orgs", orgSchema);
exports.default = OrgsModel;
//# sourceMappingURL=orgs.model.js.map