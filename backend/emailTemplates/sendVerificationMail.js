require("dotenv").config();

// const urlLink = "http://localhost:5173/";

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
          link: `${process.env.CLIENT_URL}/verify-email?emailToken=${emailToken}`,
        },
      },
      outro: [
        "If you did not request this verification, no further action is required on your part.",
        `Date: ${new Date(Date.now())}`,
        `Address: "41 Alakure street Arakale, Akure, ON, Nigeria`,
      ],
    },
  };

  return emailContent;
};

const sendResetMail = (firstName, resetUrl) => {
  const emailContent = {
    body: {
      name: firstName,
      intro: "Welcome to BamstoreNg! We're very excited to have you on board.",
      action: {
        instructions: "Please click the button below reset your password:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset Password",
          link: resetUrl,
        },
      },
      outro: [
        "If you did not request a password reset, no further action is required on your part.",
        `If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser: ${resetUrl}`,
        `Date: ${new Date().toLocaleDateString("en-US")}`,
        "Thank you for using BamstoreNg!",
      ],
    },
  };

  return emailContent;
};

module.exports = { sendVerificationMail, sendResetMail };
