import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { text } from 'stream/consumers';
@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor(){
        this.transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:"saurabhmaiti4281@gmail.com",
                pass:"gteh frgr ktwp qbof"
            },
        })
    }
    async sendOtp(otp:string,to:string){
        await this.transporter.sendMail({
            from:"saurabhmaiti4281@gmail.com",
            to:to,
            subject:"OTP for Food Delivery Backend",
            text:`Your OTP for Food Delivery Backend is ${otp}.Please do not share this OTP with anyone.`
        })
    }
}

