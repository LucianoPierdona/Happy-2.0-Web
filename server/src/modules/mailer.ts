import nodemailer from "nodemailer";
import mail from "../config/mail";
import path from "path";

import hbs from "nodemailer-express-handlebars";

const transport = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

export default transport;
