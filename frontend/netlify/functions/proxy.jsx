// netlify/functions/proxy.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const url = "https://bamstore-store.onrender.com" + event.path;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      // Set CORS headers to match your frontend's origin
      "Access-Control-Allow-Origin": "https://bamstoreng.netlify.app",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(data),
  };
};
