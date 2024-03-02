const nodemailer = require("nodemailer");

const sendEmail = async () => {
  let transporter = nodemailer.createTransport({
    service: "Outlook", // Make sure this is correctly specified
    auth: {
      user: "your-email@outlook.com",
      pass: "your-email-password",
    },
  });

  return transporter;
};

async function testSendMail() {
  let transporter = await sendEmail(); // Assuming sendEmail is async
  transporter.sendMail(
    {
      from: '"Sender Name" <sender@example.com>',
      to: "recipient@example.com",
      subject: "Test Email",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );
}

testSendMail().catch(console.error);
