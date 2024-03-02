require("dotenv").config();

const urlLink = "http://127.0.0.1:5173";

const sendVerificationMail = (firstName, emailToken) => {
  const emailContent = {
    body: {
      name: firstName,
      intro: "Welcome to BamstoreNg! We're very excited to have you on board.",
      action: {
        instructions:
          "Please click the button below to verify your email address:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your account",
          link: `${urlLink}/verify-email?emailToken=${emailToken}`,
        },
      },
      outro:
        "If you did not request this verification, no further action is required on your part.",
      dictionary: {
        date: `${new Date.now()}`,
        address: "41 Alakure street Arakale, Akure, ON, Nigeria",
      },
    },
  };

  return emailContent;
};

module.exports = { sendVerificationMail };
