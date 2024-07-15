// API calls for profile services

import toast from "react-hot-toast";
import {
  setDisplayPicture,
  setLoading,
} from "../../store/reducers/slices/authSlice";
import { APIHandler } from "../../utils/axiosInstance";
import { setConsumerData } from "../../store/reducers/slices/consumerSlice";
import { setRetailerData } from "../../store/reducers/slices/retailerSlice";
import { setManufacturerData } from "../../store/reducers/slices/manufacturer";

// display picture upload api handler
export const uploadDisplayPicture = (data, token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await APIHandler(
      "POST",
      "/profile/upload-display-picture",
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.data.success) {
      dispatch(setDisplayPicture(response.data.data.src));
      toast.success("Display picture uploaded!");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
  dispatch(setLoading(false));
};

// update profile data api handler
export const updateProfileData =
  (data, token) => async (dispatch, getState) => {
    console.log(getState().consumer);
    try {
      dispatch(setLoading(true));
      const response = await APIHandler(
        "POST",
        "/profile/update-profile",
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response.data.data);
      if (response.data.success) {
        const acType = response.data.data.accountType;
        if (acType === "consumer") {
          dispatch(setConsumerData(response.data.data));
        } else if (acType === "retailer") {
          dispatch(setRetailerData(response.data.data));
        } else if (acType === "manufacturer") {
          dispatch(setManufacturerData(response.data.data));
        }
        toast.success("Profile Updated!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
