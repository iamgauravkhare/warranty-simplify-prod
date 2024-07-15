import mongoose from "mongoose";

const consumerServicesSchema = new mongoose.Schema(
  {
    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    registeredWarrantyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registeredWarranty",
    },
    claimedWarrantyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "claimedWarranty",
    },
    
  },
  {
    timestamps: true,
  }
);

export const consumerServicesModel = mongoose.model(
  "consumerServices",
  consumerServicesSchema
);
