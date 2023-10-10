import HTML_TEMPLATE from "../mailer/mail-template.js";
import { sendMail } from "../mailer/mailer.js";

export const firstMessage = (
  from = "white.project999@gmail.com",
  to = "white.project999@gmail.com"
) => {
  const message = "Hi there, you were emailed me through nodemailer";
  const options = {
    from: from,
    to: to,
    subject: "Send email in Node.JS with Nodemailer using Gmail account",
    text: message,
    html: HTML_TEMPLATE(message),
  };

  try {
    sendMail(options, (info) => {
      console.log("MESSAGE ID: ", info.messageId);
    });
  } catch (error) {
    throw new Error(`Error in send: ${error}`);
  }
};

export const serviceMessage = (data) => {
  const options = {
    from: "white.project999@gmail.com",
    to: "white.project999@gmail.com",
    subject: "Success request",
    text: data,
    html: HTML_TEMPLATE(data),
  };

  try {
    sendMail(options, (info) => {
      console.log("MESSAGE ID: ", info.messageId);
    });
  } catch (error) {
    throw new Error(`Error in send: ${error}`);
  }
};
