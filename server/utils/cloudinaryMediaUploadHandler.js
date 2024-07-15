import { promises as fs } from "fs";
import { v2 as cloudinary } from "cloudinary";

let tempData = [];

const unlinkPromises = tempData.map(async (file) => {
  await fs.unlink(file.tempFilePath);
});

const deleteTempData = async () => {
  try {
    await Promise.all(unlinkPromises);
    console.log("Temporary data deleted successfully!");
  } catch (error) {
    console.log("Error occured while deleting temporary data!");
  }
};

export const cloudinaryMediaUploadHandler = async (file, folder) => {
  let uploadPayload = [];
  let updatedData = {};
  let response = null;
  if (Array.isArray(file)) {
    const filePromises = file.map(async (file) => {
      const data = await fs.readFile(file.tempFilePath);
      updatedData = { ...file, data: data };
      return updatedData;
    });
    try {
      uploadPayload = await Promise.all(filePromises);
      console.log("Upload payload is created!");
    } catch (error) {
      console.log("Error occured while creating upload payload!");
    }
  } else {
    const data = await fs.readFile(file.tempFilePath);
    updatedData = { ...file, data: data };
    uploadPayload.push(updatedData);
  }

  tempData = [...uploadPayload];

  const uploadPayloadPromises = uploadPayload.map((file) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: folder },
        (error, result) => {
          if (error) {
            console.log("Error occured while uploading file to cloudinary!");
            reject(error);
          } else {
            console.log("File uploaded to cloudinary successfully!");
            resolve(result);
          }
        }
      );
      uploadStream.end(file.data);
    });
  });
  try {
    response = await Promise.all(uploadPayloadPromises);
    deleteTempData();
    return response;
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while uploading file to cloudinary!");
    return error.message;
  }
};
