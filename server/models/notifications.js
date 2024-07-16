import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    markAsReadByConsumer: {
      type: Boolean,
      default: false,
    },
    markAsReadByManufacturer: {
      type: Boolean,
      default: false,
    },
    markAsReadByRetailer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const notificationModel = mongoose.model(
  "notification",
  notificationSchema
);
