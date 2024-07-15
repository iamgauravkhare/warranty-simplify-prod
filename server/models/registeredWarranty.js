import mongoose from "mongoose";

const registeredWarrantySchema = new mongoose.Schema(
  {
    brandname: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    expiryDate: {
      type: Date,
      default: () => {
        let oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        return oneYearFromNow;
      },
    },
  },
  {
    timestamps: true,
  }
);

export const registeredWarrantyModel = mongoose.model(
  "registeredWarranty",
  registeredWarrantySchema
);
