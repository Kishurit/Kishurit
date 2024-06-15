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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const nocache_1 = __importDefault(require("nocache"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = require("./server");
const routes_1 = __importDefault(require("./routes"));
const db = __importStar(require("./db1"));
const api_1 = require("./api");
dotenv.config();
(0, api_1.cls)();
const db1 = db.connectToDatabase(process.env.MONGO_URI, process.env.DB_NAME);
// export const dbConnection = {
//   url: process.env.MONGO_URI,
//   options: {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// };
// connect(dbConnection.url);
const options = {
    allowedHeaders: ["Content-Type"],
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    origin: "*",
    preflightContinue: false,
};
server_1.app.use((0, cors_1.default)(options));
server_1.app.use(express_1.default.json({ limit: "50mb" }));
server_1.app.use(body_parser_1.default.json());
server_1.app.use(express_1.default.urlencoded({ limit: "50mb", extended: false }));
server_1.app.use((0, nocache_1.default)());
// app.use(helmet()); // Add security headers
// app.disable("x-powered-by"); // Hide Express server information
// app.use(morgan("combined")); // Log HTTP requests
server_1.app.use(function (req, res, next) {
    console.log(new Date().toLocaleTimeString());
    next();
});
routes_1.default.forEach((route) => {
    server_1.app.use("/", route);
});
server_1.app.post("/*", function (req, res, next) {
    res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
server_1.app.get("/*", function (req, res, next) {
    res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
exports.default = server_1.app;
//# sourceMappingURL=index.js.map