// profile services route handlers

import { userModel } from "../models/user.js";
import { cloudinaryMediaUploadHandler } from "../utils/cloudinaryMediaUploadHandler.js";

// profile data upload route handler
export const updateProfile = async (req, res) => {
  try {
    const data = await userModel.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Profile data updated",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};

// display picture upload route handler
export const updateDisplayPicture = async (req, res) => {
  try {
    if (!req.files.displayPicture) {
      return res.status(404).json({
        success: false,
        message: "Invalid input!",
      });
    }
    const uploadPayload = req.files.displayPicture;
    const uploadResponse = await cloudinaryMediaUploadHandler(
      uploadPayload,
      process.env.CLOUDINARY_CLOUD_FOLDER
    );
    const databasePayload = {
      publicId: uploadResponse[0].public_id,
      src: uploadResponse[0].secure_url,
      fileType: uploadResponse[0].resource_type,
    };
    const { displayPicture } = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        displayPicture: databasePayload,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Display picture uploaded",
      data: displayPicture,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};
