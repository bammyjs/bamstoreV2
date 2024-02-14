const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: "Your appointment is coming up on July 21 at 3PM",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+2348139647915",
  })
  .then((message) => console.log(message.sid))
  .done();
