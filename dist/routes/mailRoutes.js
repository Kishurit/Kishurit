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
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const express_1 = __importDefault(require("express"));
const MailService_1 = __importDefault(require("../controller/MailService"));
const mailRouter = express_1.default.Router();
mailRouter.post("/mail", function (req, res, next) {
    const { data } = req.body; // Cast req.body to the expected type
    var { email, subject, name, tel, message } = data;
    if (name.trim() === "")
        name = "---";
    if (tel.trim() === "")
        tel = "---";
    if (email.trim() === "")
        email = "email@from.client";
    const mail = `Message from ${email} name: ${name}  tel: ${tel}\n ${message.trim()}`;
    console.log(mail);
    MailService_1.default.sendMail({ from: email, subject: subject, text: mail }, req, res);
});
mailRouter.post("/report", function (req, res, next) {
    const { report, name } = req.body; // Cast req.body to the expected type
    const mail = `Report for ${name}\n${report}`;
    MailService_1.default.sendMail({ from: "romanbr@walla.com", subject: "report", text: mail }, req, res);
});
mailRouter.post("/neworg", function (req, res, next) {
    const { data } = req.body; // Cast req.body to the expected type
    const email = `${JSON.stringify(data, null, 2)}\n`;
    MailService_1.default.sendMail({ from: "romanbr@walla.com", subject: "new organization", text: email }, req, res);
    //res.send(data);
});
exports.default = mailRouter;
//# sourceMappingURL=mailRoutes.js.map