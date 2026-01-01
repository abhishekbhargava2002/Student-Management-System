const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    //connect with the smtp ethereal
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_POR,
      auth: {
        user: "	abelardo34@ethereal.email",
        pass: "JvJDFhDbHXNK53f43p",
      },
    });

    await transporter.sendMail({
      from: `"Student Managment System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = { sendEmail };
