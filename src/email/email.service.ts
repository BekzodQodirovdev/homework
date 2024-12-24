import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private maillerService: MailerService) {}

  async otpSend(email: string, id: number) {
    try {
      await this.maillerService.sendMail({
        to: email,
        subject: 'OTP CODE',
        html: `<a href="${process.env.DOMAIN}/auth/verify/${id}">Your otp</a>`,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}
