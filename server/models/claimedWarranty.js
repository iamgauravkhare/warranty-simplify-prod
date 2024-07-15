import mongoose from "mongoose";

const claimedWarrantySchema = new mongoose.Schema(
  {
    brandname: {
      type: String,
      trim: true,
      required: true,
    },
    productId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    issue: {
      type: String,
      required: true,
      trim: true,
    },
    invoice: {
      type: Object,
    },
    productImages: {
      type: Array,
      default: [],
    },
    progress: {
      type: Object,
      default: {
        claimInitiated: {
          status: true,
          time: null,
        },
        claimInProcessRetailer: {
          status: false,
          time: null,
        },
        claimInProcessManufacturer: {
          status: false,
          time: null,
        },
        claimApproved: {
          status: false,
          time: null,
        },
      },
    },
    progressStep: {
      type: Number,
      default: 1,
    },
    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    forwardedByRetailer: {
      type: Boolean,
      default: false,
    },
    retailerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const claimedWarrantyModel = mongoose.model(
  "claimedWarranty",
  claimedWarrantySchema
);
