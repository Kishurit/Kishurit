import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import MailService from "../controller/MailService";

const mailRouter: express.Router = express.Router();

import {
  Categorie,
  SubCategorie,
  Business,
  Location,
  Mail,
  Kishurit,
} from "../types";

mailRouter.post(
  "/mail",
  function (req: Request, res: Response, next: NextFunction) {
    const { data } = req.body as { data: Mail }; // Cast req.body to the expected type
    var { email, subject, name, tel, message } = data;

    if (name.trim() === "") name = "---";
    if (tel.trim() === "") tel = "---";
    if (email.trim() === "") email = "email@from.client";
    const mail = `Message from ${email} name: ${name}  tel: ${tel}\n ${message.trim()}`;

    console.log(mail);
    MailService.sendMail(
      { from: email, subject: subject, text: mail },
      req,
      res
    );
  }
);

mailRouter.post(
  "/report",
  function (req: Request, res: Response, next: NextFunction) {
    const { report, name } = req.body as { report: string; name: string }; // Cast req.body to the expected type
    const mail = `Report for ${name}\n${report}`;
    MailService.sendMail(
      { from: "romanbr@walla.com", subject: "report", text: mail },
      req,
      res
    );
  }
);

mailRouter.post(
  "/neworg",
  function (req: Request, res: Response, next: NextFunction) {
    const { data } = req.body as { data: Business }; // Cast req.body to the expected type
    const email = `${JSON.stringify(data, null, 2)}\n`;
    MailService.sendMail(
      { from: "romanbr@walla.com", subject: "new organization", text: email },
      req,
      res
    );
    //res.send(data);
  }
);

export default mailRouter;
