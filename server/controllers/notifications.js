import { notificationModel } from "../models/notifications.js";
import { userModel } from "../models/user.js";

export const markAsRead = async (req, res) => {
  try {
    const acType = req.user.accountType;

    const updatedData = await notificationModel.findByIdAndUpdate(
      req.body.id,
      acType === "consumer"
        ? { markAsReadByConsumer: true }
        : acType === "retailer"
        ? { markAsReadByRetailer: true }
        : { markAsReadByManufacturer: true },
      { new: true }
    );

    const resPayload = await userModel
      .findById(req.user.id)
      .populate({
        path: "notifications",
        match:
          acType === "consumer"
            ? { markAsReadByConsumer: false }
            : acType === "retailer"
            ? { markAsReadByRetailer: false }
            : { markAsReadByManufacturer: false },
      })
      .select("notifications");

    res.status(200).json({
      success: true,
      message: "Notification marked as read!",
      data: resPayload.notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error!",
    });
  }
};
