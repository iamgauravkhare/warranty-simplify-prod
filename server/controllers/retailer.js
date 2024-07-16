// retailer services route handlers

import { claimedWarrantyModel } from "../models/claimedWarranty.js";
import { manufacturerServicesModel } from "../models/manufacturerServices.js";
import { notificationModel } from "../models/notifications.js";
import { retailerServicesModel } from "../models/retailerServices.js";
import { userModel } from "../models/user.js";

export const getReClaimedWarrantyData = async (req, res) => {
  try {
    const brandsData = await retailerServicesModel
      .findOne({ retailerId: req.user.id })
      .select("associatedBrands");

    if (!brandsData) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong!",
      });
    }

    const data = await claimedWarrantyModel
      .find({
        brandname: { $in: brandsData.associatedBrands },
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const setAssociatedBrandData = async (req, res) => {
  try {
    const reqPayload = req.body;
    const retailerServicesData = new retailerServicesModel({
      retailerId: req.user.id,
      associatedBrands: reqPayload,
    });
    await retailerServicesData.save();
    res.status(201).json({
      success: true,
      message: "Brands added successfully!",
      data: retailerServicesData.associatedBrands,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

export const getClaimData = async (req, res) => {
  try {
    const { claimId } = req.body;
    const data = await claimedWarrantyModel.findOne({ _id: claimId }).populate({
      path: "consumerId",
      select: "firstname lastname mobileNumber email",
    });
    const manuData = await manufacturerServicesModel
      .findOne({
        brandname: data.brandname,
      })
      .populate({
        path: "manufacturerId",
        select: "mobileNumber email",
      });

    res.status(200).json({
      data: {
        ...data._doc,
        manuData: manuData ? { ...manuData._doc } : null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const forwardClaimToManufacture = async (req, res) => {
  try {
    const { claimId } = req.body;
    const updatedData = await claimedWarrantyModel.findOneAndUpdate(
      { _id: claimId },
      {
        "progress.claimInProcessRetailer.status": true,
        "progress.claimInProcessRetailer.time": new Date(),
        progressStep: 2,
        forwardedByRetailer: true,
        retailerId: req.user.id,
      },
      { new: true }
    );
    const notiData = await notificationModel.create({
      message: "Claim forwaded to manufacturer with claim id - " + claimId,
    });
    const manuData = await manufacturerServicesModel.findOne({
      brandname: updatedData.brandname,
    });
    await userModel.findByIdAndUpdate(
      { _id: manuData.manufacturerId },
      {
        $push: { notifications: notiData._id.toString() },
      }
    );
    await userModel.findByIdAndUpdate(
      { _id: updatedData.consumerId },
      { $push: { notifications: notiData._id.toString() } }
    );

    res.status(200).json({ data: updatedData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const getAssociations = async (req, res) => {
  try {
    const data = await retailerServicesModel.findOne({
      retailerId: req.user.id,
    });
    res.status(200).json({ data: data?.associatedBrands });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
