import { notificationModel } from "../models/notifications.js";
import { userModel } from "../models/user.js";

export const markAsRead = async (req, res) => {
  try {
    const updatedData = await notificationModel.findByIdAndUpdate(
      req.body.id,
      {
        markAsRead: true,
      },
      { new: true }
    );

    const resPayload = await userModel
      .findById(req.user.id)
      .populate({
        path: "notifications",
        match: { markAsRead: false },
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
