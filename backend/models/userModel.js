const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [6, "password must be up to 6 character"],
  },
  role: {
    type: String,
    required: [true],
    default: "customer",
    enum: ["customer", "admin"],
  },
  photo: {
    type: String,
    required: [true, "please upload a image"],
    default: "https://i.ibb.co/4pDNDK1/avatar.png",
  },
  phone: {
    type: String,
    default: "+234",
  },
  address: {
    type: Object,
    //address, state, country
  },
});

//encrypt password before saving to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
