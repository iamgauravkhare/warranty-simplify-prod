import mongoose from "mongoose";

const manufacturerServicesSchema = new mongoose.Schema(
  {
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    brandname: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const manufacturerServicesModel = mongoose.model(
  "manufacturerServices",
  manufacturerServicesSchema
);
