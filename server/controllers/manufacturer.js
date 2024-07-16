// manufacturer services route handlers

import { claimedWarrantyModel } from "../models/claimedWarranty.js";
import { manufacturerServicesModel } from "../models/manufacturerServices.js";
import { notificationModel } from "../models/notifications.js";
import { userModel } from "../models/user.js";

// fetching claimed warranties data route handler for consumer
export const claimedWarranties = async (req, res) => {
  try {
    const { brandname } = await manufacturerServicesModel.findOne({
      manufacturerId: req.user.id,
    });
    const claimedWarrantiesPayload = await claimedWarrantyModel
      .find({
        brandname: brandname,
      })
      .sort({ createdAt: -1 })
      .populate({
        path: "consumerId",
        select: "firstname lastname mobileNumber",
      })
      .exec();

    return res.status(200).json({
      succes: true,
      data: claimedWarrantiesPayload,
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Internal server error!",
    });
  }
};

// fetching individual claim data route handler
export const getClaimData = async (req, res) => {
  try {
    const { claimId } = req.body;
    const data = await claimedWarrantyModel
      .findOne({ _id: claimId })
      .populate({
        path: "consumerId",
        select: "firstname lastname mobileNumber email",
      })
      .exec();
    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// approve claim route handler
export const approveClaim = async (req, res) => {
  try {
    const { claimId } = req.body;
    const claimData = await claimedWarrantyModel.findOneAndUpdate(
      { _id: claimId },
      {
        "progress.claimInProcessManufacturer.status": true,
        "progress.claimInProcessManufacturer.time": new Date(),
        "progress.claimApproved.status": true,
        "progress.claimApproved.time": new Date(),
        progressStep: 3,
      },
      { new: true }
    );
    const notiData = await notificationModel.create({
      message: "Claim approved by manufacturer with claim id - " + claimId,
    });
    await userModel.findByIdAndUpdate(
      { _id: claimData.retailerId },
      { $push: { notifications: notiData._id.toString() } }
    );
    await userModel.findByIdAndUpdate(
      { _id: claimData.consumerId },
      { $push: { notifications: notiData._id.toString() } }
    );
    res.status(200).json({ data: claimData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
