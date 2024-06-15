import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MailService {
  private static instance: MailService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.createConnection();
  }

  // INSTANCE CREATE FOR MAIL
  static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  // CREATE A CONNECTION FOR LIVE
  private createConnection(): void {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // SEND MAIL
  public async sendMail(options: nodemailer.SendMailOptions, req: Request, res: Response): Promise<void> {
    try {
        if(!this.transporter) {
            await this.createConnection();
        }
      
        options.to = 'drushimgalil@gmail.com';
        console.log (options);
        const info = await this.getTransporter().sendMail(options);
        await this.verifyConnection(info);
        res.send (options);
    } catch (err) {
      console.error(err);
      res.status(404).json ({ status: 404, message: err})      
    }
  }

  // VERIFY CONNECTION
  private async verifyConnection(info: any): Promise<void> {
    try {
      await this.transporter.verify();
      console.log('Email sent: ' + info.response);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));      
    } catch (err) {
      console.error(err);
    }
  }
  
  // CREATE TRANSPORTER
  private getTransporter(): nodemailer.Transporter {
    return this.transporter;
  }
}

export default MailService.getInstance();
