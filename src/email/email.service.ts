import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private maillerService: MailerService) {}

  async otpSend(email: string, message: string) {
    try {
      await this.maillerService.sendMail({
        to: email,
        subject: 'OTP CODE',
        text: message,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}
