const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pickUpStoreSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      trim: true,
      required: [true, "Store name is required"],
    },
    photo: {
      type: String,
      required: [true, "Please upload an image"],
      default: "https://i.ibb.co/4pDNDK1/avatar.png",
    },
    phone: {
      type: String,
      default: "+234",
      //   validate: {
      //     validator: function(v) {
      //       return /\+\d{1,3}-\d{1,14}(-\d{1,13})?/.test(v);
      //     },
      //     message: props => `${props.value} is not a valid phone number!`
      //   }
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    state: {
      type: String,
      //   required: [true, "State is required"],
    },
    city: {
      type: String,
      //   required: [true, "State is required"],
    },
    country: {
      type: String,
      default: "NGN",
      //   required: [true, "Country is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    contactPerson: {
      name: {
        type: String,
        // required: [true, "Contact person name is required"],
      },
      phone: {
        type: String,
        // required: [true, "Contact person phone number is required"],
      },
      email: {
        type: String,
        // required: [true, "Contact person email is required"],
        trim: true,
        lowercase: true,
      },
    },
    storeManager: {
      type: ObjectId,
      ref: "User", // Assuming you have a User model for managing store managers
      //   required: [true, "Store manager is required"],
    },
    remittance: {
      totalAmountDue: {
        type: Number,
        default: 0,
      },
      lastRemittanceDate: {
        type: Date,
      },
      nextRemittanceDate: {
        type: Date,
        // required: true,
      },
      remittanceStatus: {
        type: String,
        enum: ["Pending", "Completed", "Overdue"],
        default: "Pending",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PickUpStore = mongoose.model("PickUpStore", pickUpStoreSchema);
module.exports = PickUpStore;
