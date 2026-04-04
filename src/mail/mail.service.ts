import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { text } from 'stream/consumers';
@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor(private configService: ConfigService){
        this.transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:this.configService.get<string>('SMTP_USER'),
                pass:this.configService.get<string>('SMTP_PASSWORD')
            },
        })
    }
    async sendOtp(otp:string,to:string){
        await this.transporter.sendMail({
            from:this.configService.get<string>('SMTP_USER'),
            to:to,
            subject:"OTP for Food Delivery Backend",
            text:`Your OTP for Food Delivery Backend is ${otp}.Please do not share this OTP with anyone.`
        })
    }
}

