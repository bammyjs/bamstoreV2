require("dotenv").config();
const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const sendEmail = async (subject, send_to, template) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailGenerator = new MailGen({
    theme: "default",
    product: {
      color: "#3869D4",
      name: "Bamstore NG",
      link: "http://Localhost:5173",
      logo: "https://res.cloudinary.com/bamtech1/image/upload/v1709332282/bamstore/bammylogo_jismsm.png",
      logoHeight: "30px",
    },
  });

  const emailBody = mailGenerator.generate(template);
  // require("fs").writeFileSync("preview.html", emailBody, "utf8");

  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: send_to, // list of receivers
    subject, // Subject line
    html: emailBody, // Generated HTML body from Mailgen
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
