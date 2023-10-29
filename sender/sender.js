import HTML_TEMPLATE from "../mailer/mail-template.js";
import { sendMail } from "../mailer/mailer.js";

export const firstMessage = (to = `${process.env.EMAIL}`) => {
  const message = `${process.env.MESSAGE_FOR_USER}`;
  const options = {
    from: `${process.env.EMAIL}`,
    to: to,
    subject: "Ваш заказ на поиск принят в работу.",
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
    from: `${process.env.EMAIL}`,
    to: `${process.env.EMAIL}`,
    subject: "Success",
    text: data
  };

  try {
    sendMail(options, (info) => {
      console.log("MESSAGE ID: ", info.messageId);
    });
  } catch (error) {
    throw new Error(`Error in send: ${error}`);
  }
};
