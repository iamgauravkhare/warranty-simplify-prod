// auth routes handlers

import { manufacturerServicesModel } from "../models/manufacturerServices.js";
import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import oneTimePassGenerator from "otp-generator";
import emailHandler from "../utils/emailHandler.js";

// sign-up-api-route-handler
export const signUp = async (req, res) => {
  try {
    const { accountType } = req.body;
    if (!accountType) {
      return res.status(404).json({
        success: false,
        message: "Please select account type!",
      });
    }
    if (accountType === "manufacturer") {
      if (!req.body.brandname) {
        return res.status(404).json({
          success: false,
          message: "Invalid or blank entries!",
        });
      }
    }
    const { firstname, lastname, email, username, password, mobileNumber } =
      req.body;
    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !accountType ||
      !mobileNumber
    ) {
      return res.status(404).json({
        success: false,
        message: "Inavalid or blank entries!",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUserPayload = {
      firstname,
      lastname,
      username,
      password: hashpassword,
      email,
      accountType,
      mobileNumber,
    };
    const user = await userModel.create(newUserPayload);
    if (user.accountType === "manufacturer") {
      await manufacturerServicesModel.create({
        manufacturerId: user._id,
        brandname: req.body.brandname,
      });
    }
    user.password = "";
    const authtokenPayload = {
      id: user._id,
      accountType: user.accountType,
    };
    const token = jsonWebToken.sign(
      authtokenPayload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24hr",
      }
    );
    const responsePayload = {
      user: user,
      token: token,
      accountType: user.accountType,
    };
    res.status(201).json({
      success: true,
      message: "Account created succesfully!",
      responsePayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// sign-in-api-route-handler
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(404).json({
        success: false,
        message: "Inavalid or blank entries!",
      });
    }
    const user = await userModel
      .findOne({ username: username })
      .select("+password")
      .populate({
        path: "notifications",
        match: { markAsRead: false },
      });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found, please sign up to continue!",
      });
    }
    const passCheck = await bcrypt.compare(password, user.password);
    if (passCheck) {
      user.password = "";
      const authtokenPayload = {
        id: user._id,
        accountType: user.accountType,
      };
      const token = jsonWebToken.sign(
        authtokenPayload,
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "24hr",
        }
      );
      const responsePayload = {
        user: user,
        token: token,
        accountType: user.accountType,
      };
      res.status(200).json({
        success: true,
        message: "Logged in succesfully!",
        responsePayload,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// fetching-user-data-route-handler
export const userData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).populate({
      path: "notifications",
      match: { markAsRead: false },
    });
    const responsePayload = {
      user: user,
      accountType: user.accountType,
    };
    res.status(201).json({
      success: true,
      message: "Data fetched!",
      responsePayload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// forget-password-OTP-api-route-handler
export const forgetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid entries!" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }
    const OTP = oneTimePassGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    user.forgetPasswordToken = OTP.toString();
    await user.save();
    const emailBody = `<h1>Forget Password OTP is ${OTP}</h1>`;
    await emailHandler(email, "Forget Password OTP", emailBody);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// reset-password-api-route-handler
export const resetPassword = async (req, res) => {
  try {
    const { email, resetPasswordToken, newPassword, confirmNewPassword } =
      req.body;

    if (!email || !resetPasswordToken || !newPassword || !confirmNewPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid entries!" });
    }
    if (newPassword !== confirmNewPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Password not matched!" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }
    if (user.forgetPasswordToken === resetPasswordToken.trim()) {
      const hashedPass = await bcrypt.hash(newPassword, 10);
      user.password = hashedPass;
      user.forgetPasswordToken = "";
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password reset successfull!",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "OTP is incorrect!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// export const changePassword = () => {};
