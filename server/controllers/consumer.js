// consumer services route handlers

import { claimedWarrantyModel } from "../models/claimedWarranty.js";
import { consumerServicesModel } from "../models/consumerServices.js";
import { registeredWarrantyModel } from "../models/registeredWarranty.js";
import { cloudinaryMediaUploadHandler } from "../utils/cloudinaryMediaUploadHandler.js";

// register warranty route handler
export const registerWarranty = async (req, res) => {
  try {
    const { brandname, productId } = req.body;
    if (!brandname || !productId) {
      return res.status(404).json({
        success: false,
        message: "Inavalid or blank entries!",
      });
    }
    const registeredWarrantyData = await registeredWarrantyModel.create({
      brandname: brandname.toLowerCase(),
      productId,
    });
    await consumerServicesModel.create({
      consumerId: req.user.id,
      registeredWarrantyId: registeredWarrantyData._id,
    });
    return res.status(201).json({
      success: true,
      message: "Warranty registered succesfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: error,
      message: "Something went wrong!",
    });
  }
};

// checking warranty expiry route handler
export const checkWarrantyExpiry = async (req, res) => {
  try {
    const { productId } = req.params;
    const warrantyData = await registeredWarrantyModel.findOne({
      productId: productId,
    });
    if (!warrantyData) {
      return res
        .status(404)
        .json({ success: false, message: "Warranty not found" });
    }
    if (warrantyData.expiryDate > new Date()) {
      res.status(200).json({ success: true, message: "Warranty approved!" });
    } else {
      res.status(200).json({ success: false, message: "Warranty expired!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// claim warranty route handler
export const claimWarranty = async (req, res) => {
  try {
    let imagesPayload;
    let invoicePayload;
    const { brandname, productId, productIssue } = req.body;
    if (req.files.imagesPayload) {
      imagesPayload = req.files.imagesPayload;
    } else {
      return res.status(404).json({
        success: false,
        message: "Inavalid or blank entries!",
      });
    }
    if (req.files.invoicePayload) {
      invoicePayload = req.files.invoicePayload;
    } else {
      return res.status(404).json({
        success: false,
        message: "Inavalid or blank entries!",
      });
    }
    if (!brandname || !productId || !productIssue) {
      return res.status(404).json({
        success: false,
        message: "Inavalid or blank entries!",
      });
    }
    const imagesPayloadUploadResponse = await cloudinaryMediaUploadHandler(
      imagesPayload,
      process.env.CLOUDINARY_CLOUD_FOLDER
    );
    const invoicePayloadUploadResponse = await cloudinaryMediaUploadHandler(
      invoicePayload,
      process.env.CLOUDINARY_CLOUD_FOLDER
    );
    const imagesDatabasePayloadPromises = imagesPayloadUploadResponse.map(
      (e) => {
        return {
          publicId: e.public_id,
          src: e.secure_url,
          fileType: e.resource_type,
        };
      }
    );
    const imagesDatabasePayload = await Promise.all(
      imagesDatabasePayloadPromises
    );
    const invoiceDatabasePayload = {
      publicId: invoicePayloadUploadResponse[0].public_id,
      src: invoicePayloadUploadResponse[0].secure_url,
      fileType: invoicePayloadUploadResponse[0].resource_type,
    };
    const claimedWarrantyData = await claimedWarrantyModel.create({
      brandname: brandname.toLowerCase(),
      productId,
      issue: productIssue,
      invoice: invoiceDatabasePayload,
      productImages: imagesDatabasePayload,
      consumerId: req.user.id,
    });
    await consumerServicesModel.findOneAndUpdate(
      {
        consumerId: req.user.id,
      },
      {
        claimedWarrantyId: claimedWarrantyData._id,
      }
    );
    res.status(200).json({
      success: true,
      message: "Calimed successfully!",
      claimId: claimedWarrantyData._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// fetching claimed warranties data route handler for consumer
export const getClaimWarranties = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await claimedWarrantyModel
      .find({ consumerId: id })
      .sort({ createdAt: -1 })
      .select("productId progressStep createdAt");
    res
      .status(200)
      .json({ success: true, messsage: "Data fetched!", data: data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// fetching registered warranties data route handler
export const getRegisteredWarranties = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await consumerServicesModel
      .find({ consumerId: id })
      .sort({ createdAt: -1 })
      .populate("registeredWarrantyId");
    res
      .status(200)
      .json({ success: true, messsage: "Data fetched!", data: data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// fetching individual claim data route handler
export const getClaimData = async (req, res) => {
  try {
    const { claimId } = req.body;
    const data = await claimedWarrantyModel.findOne({ _id: claimId });
    const warrantyData = await registeredWarrantyModel.findOne({
      productId: data.productId,
    });
    const resPayload = { ...data._doc, warrantyData: warrantyData || null };
    res
      .status(200)
      .json({ success: true, messsage: "Data fetched!", data: resPayload });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
