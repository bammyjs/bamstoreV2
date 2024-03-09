const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const errorHandler = require("./middleware/errorMiddleware");
const http = require("http");
const https = require("https");
const fs = require("fs"); // For file operations
const path = require("path");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

//routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Home page...");
// });

// error Middleware
app.use(errorHandler);

const options = {
  cert: fs.readFileSync("certificate/cert.pem"),
  key: fs.readFileSync("certificate/key.pem"),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const httpPort = 80;
const httpsPort = 443;

httpServer.listen(httpPort, () => {
  console.log(`HTTP Server running on port ${httpPort}`);
});

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server running on port ${httpsPort}`);
});

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
