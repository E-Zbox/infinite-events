import { readFileSync } from "fs";
import Handlebars from "handlebars";
import { join } from "path";
import nodemailer from "nodemailer";
// interfaces
import { IRecord } from "@/utils/models/interfaces";

const { EMAIL_PASSWORD, EMAIL_SENDER } = process.env;

const transporter = nodemailer.createTransport({
  auth: {
    pass: EMAIL_PASSWORD,
    user: EMAIL_SENDER,
  },
  service: "gmail",
});

export const sendOTPMail = async (
  { sendTo, subject, filePath }: IRecord,
  options: any
) => {
  const baseTemplate = Handlebars.compile(
    readFileSync(filePath, { encoding: "utf-8" })
  );

  const compiledBaseTemplate = baseTemplate(options);

  return await transporter.sendMail({
    from: `Favvii Brand ${EMAIL_SENDER}`,
    to: sendTo,
    subject,
    html: compiledBaseTemplate,
  });
};

export const sendAccountVerificationMail = async ({
  sendTo,
  subject,
  fullName,
  otpCode,
  timeWithMeridian,
}: IRecord) => {
  const filePath = join(__dirname, "../../templates/account-verification.html");

  const options = { fullName, otpCode, timeWithMeridian };

  return await sendOTPMail({ sendTo, subject, filePath }, options);
};

export const sendChangePasswordOTPMail = async ({
  sendTo,
  subject,
  fullName,
  otpCode,
  timeWithMeridian,
}: IRecord) => {
  const filePath = join(__dirname, "../../templates/forgot-password.html");

  const options = { fullName, otpCode, timeWithMeridian };

  return await sendOTPMail({ sendTo, subject, filePath }, options);
};

export const sendEmailValidationOTPMail = async ({
  sendTo,
  subject,
  fullName,
  otpCode,
  timeWithMeridian,
}: IRecord) => {
  const filePath = join(__dirname, "../../templates/validate-email.html");

  const options = { fullName, otpCode, timeWithMeridian };

  return await sendOTPMail({ sendTo, subject, filePath }, options);
};
