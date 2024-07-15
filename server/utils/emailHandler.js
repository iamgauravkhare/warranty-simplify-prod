import { createTransport } from "nodemailer";

const emailHandler = async (email, title, body) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      host: process.env.NODE_MAILER_HOST,
      auth: {
        user: process.env.NODE_MAILER_EMAIL_ADDRESS,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
      port: 465,
      secure: false,
    });
    const response = await transporter.sendMail({
      from: `Warranty Simplified Private Limited. | <${process.env.NODE_MAILER_EMAIL_ADDRESS}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Mail sent successfully!");
    return response;
  } catch (error) {
    console.log("Error occured while sending email!");
    return error.message;
  }
};

export default emailHandler;
