import nodemailer, { SendMailOptions } from "nodemailer";
import log from "./src/utils/logger";
import path from "path";
import fs from "fs";
import { MailOptions } from "nodemailer/lib/json-transport";
import ejs from "ejs";

// async function CreateTestCreds (){
//     const creds = await nodemailer.createTestAccount();
//     log.info(creds)
// }

// CreateTestCreds()

// const smtp = config.get<ISMTP>("smtp")

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "twxvchinto@gmail.com",
    pass: "cgakulomjywzycoj",
  },
});

async function sendEmail(
  mail: MailOptions,
  context: Record<string, any>,
  templateName: string
) {
  try {
    const templatetPath = path.join(
      __dirname,
      "Templates",
      `${templateName}.ejs`
    );

    const template = fs.readFileSync(templatetPath, "utf-8");

    const html = ejs.render(template, context);

    const mailOption: MailOptions = {
      to: mail.to,
      subject: mail.subject,
      html,
    };
    transport.sendMail(mailOption, (err, info) => {
      if (err) {
        log.error("error sending  eamil " + err);
        return;
      }
      log.info("Preview email is " + info.response);
    });
  } catch (error) {
    throw new Error("error while sending email unexpected error");
  }
}
export default sendEmail;
