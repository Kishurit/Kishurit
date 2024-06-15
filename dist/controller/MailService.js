"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MailService {
    static instance;
    transporter;
    constructor() {
        this.createConnection();
    }
    // INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    // CREATE A CONNECTION FOR LIVE
    createConnection() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
    // SEND MAIL
    async sendMail(options, req, res) {
        try {
            if (!this.transporter) {
                await this.createConnection();
            }
            options.to = 'drushimgalil@gmail.com';
            console.log(options);
            const info = await this.getTransporter().sendMail(options);
            await this.verifyConnection(info);
            res.send(options);
        }
        catch (err) {
            console.error(err);
            res.status(404).json({ status: 404, message: err });
        }
    }
    // VERIFY CONNECTION
    async verifyConnection(info) {
        try {
            await this.transporter.verify();
            console.log('Email sent: ' + info.response);
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
        }
        catch (err) {
            console.error(err);
        }
    }
    // CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}
exports.default = MailService.getInstance();
//# sourceMappingURL=MailService.js.map