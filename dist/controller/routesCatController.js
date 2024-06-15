"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesData = void 0;
const categories_model_1 = __importDefault(require("../models/categories.model"));
const categoriesData = () => {
    categories_model_1.default
        .find()
        .then((data) => {
        const categoryNames = data.map((info) => info.name);
        console.log(categoryNames);
    })
        .catch((err) => console.log(err));
};
exports.categoriesData = categoriesData;
//# sourceMappingURL=routesCatController.js.map