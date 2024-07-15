import mongoose from "mongoose";

const retailerServicesSchema = new mongoose.Schema(
  {
    retailerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    associatedBrands: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const retailerServicesModel = mongoose.model(
  "retailerServices",
  retailerServicesSchema
);
