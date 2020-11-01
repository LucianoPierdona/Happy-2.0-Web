import nodemailer from "nodemailer";
import mail from "../config/mail";

// Email Data
const transport = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

export default transport;
