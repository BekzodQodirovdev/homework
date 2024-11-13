import nodemailer from "nodemailer";
// import { config } from "dotenv";

// config();
// console.log(process.env.SMTP_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oldakkaun4@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = (to, subject, text) => {
  transporter.sendMail(
    {
      from: "oldakkaun4@gmail.com",
      to,
      subject,
      text,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
