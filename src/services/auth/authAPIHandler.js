// API calls for authentication services

import toast from "react-hot-toast";
import {
  setAccountType,
  setDisplayPicture,
  setLoading,
  setToken,
} from "../../store/reducers/slices/authSlice";
import {
  setConsumerData,
  setRegisteredWarramtyData,
  setConsClaimedWarrantyData,
  setConsNotifications,
} from "../../store/reducers/slices/consumerSlice";
import {
  setManufacturerData,
  setManuClaimedWarrantyData,
  setManuNotifications,
} from "../../store/reducers/slices/manufacturer";
import {
  setRetailerData,
  setRetaClaimedWarrantyData,
  setRetaNotifications,
} from "../../store/reducers/slices/retailerSlice";
import { APIHandler } from "../../utils/axiosInstance";

// Sign Up API Handler
export const signUpAPIHandler = (data, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await APIHandler("POST", "/auth/sign-up", data);
    if (response.data.success) {
      const acType = response.data.responsePayload.accountType;
      if (acType === "consumer") {
        dispatch(setConsumerData(response.data.responsePayload.user));
      } else if (acType === "retailer") {
        dispatch(setRetailerData(response.data.responsePayload.user));
      } else if (acType === "manufacturer") {
        dispatch(setManufacturerData(response.data.responsePayload.user));
      }
      dispatch(setToken(response.data.responsePayload.token));
      dispatch(setAccountType(response.data.responsePayload.accountType));
      localStorage.setItem("token", response.data.responsePayload.token);
      navigate(`/${response.data.responsePayload.accountType}-dashboard`);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(setLoading(false));
    return;
  }
  dispatch(setLoading(false));
  toast.success("Account created!");
};

// Sign In API Handler
export const signInAPIHandler = (data, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await APIHandler("POST", "/auth/sign-in", data);
    if (response.data.success) {
      const acType = response.data.responsePayload.accountType;
      if (acType === "consumer") {
        dispatch(setConsumerData(response.data.responsePayload.user));
        dispatch(
          setConsNotifications(response.data.responsePayload.user.notifications)
        );
      } else if (acType === "retailer") {
        dispatch(setRetailerData(response.data.responsePayload.user));
        dispatch(
          setRetaNotifications(response.data.responsePayload.user.notifications)
        );
      } else if (acType === "manufacturer") {
        dispatch(setManufacturerData(response.data.responsePayload.user));
        dispatch(
          setManuNotifications(response.data.responsePayload.user.notifications)
        );
      }
      dispatch(
        setDisplayPicture(
          response.data.responsePayload.user?.displayPicture?.src
        )
      );
      dispatch(setToken(response.data.responsePayload.token));
      dispatch(setAccountType(response.data.responsePayload.accountType));
      localStorage.setItem("token", response.data.responsePayload.token);
      navigate(`/${response.data.responsePayload.accountType}-dashboard`);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(setLoading(false));
    return;
  }
  dispatch(setLoading(false));
  toast.success("Logged in!");
};

// get user data if already logged in on (hard refresh) or in case of token is available in browser
export const alreadySignedInAPIHandler =
  (data, navigate) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await APIHandler("POST", "/auth/user-data", null, {
        Authorization: `Bearer ${data.token}`,
      });
      if (response.data.success) {
        const acType = response.data.responsePayload.accountType;
        if (acType === "consumer") {
          dispatch(setConsumerData(response.data.responsePayload.user));
          dispatch(
            setConsNotifications(
              response.data.responsePayload.user.notifications
            )
          );
        } else if (acType === "retailer") {
          dispatch(setRetailerData(response.data.responsePayload.user));
          dispatch(
            setRetaNotifications(
              response.data.responsePayload.user.notifications
            )
          );
        } else if (acType === "manufacturer") {
          dispatch(setManufacturerData(response.data.responsePayload.user));
          dispatch(
            setManuNotifications(
              response.data.responsePayload.user.notifications
            )
          );
        }
        dispatch(
          setDisplayPicture(
            response.data.responsePayload.user.displayPicture?.src
          )
        );
        dispatch(setAccountType(response.data.responsePayload.accountType));
        navigate(`/${response.data.responsePayload.accountType}-dashboard`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };

// Logout API Handler
export const logoutAPIHandler = (navigate) => async (dispatch, getState) => {
  try {
    const accountType = getState().auth.accountType;
    dispatch(setLoading(true));
    dispatch(setToken(null));
    dispatch(setAccountType(null));
    dispatch(setDisplayPicture(null));
    if (accountType === "consumer") {
      dispatch(setConsumerData(null));
      dispatch(setRegisteredWarramtyData(null));
      dispatch(setConsClaimedWarrantyData(null));
      dispatch(setConsNotifications(null));
    } else if (accountType === "retailer") {
      dispatch(setRetailerData(null));
      dispatch(setRetaClaimedWarrantyData(null));
      dispatch(setRetaNotifications(null));
    } else if (accountType === "manufacturer") {
      dispatch(setManufacturerData(null));
      dispatch(setManuClaimedWarrantyData(null));
      dispatch(setManuNotifications(null));
    }
    localStorage.removeItem("token");
    navigate(`/sign-in`);
  } catch (error) {
    toast.error("Internal server error!");
    dispatch(setLoading(false));
    return;
  }
  dispatch(setLoading(false));
  toast.success("Logged out!");
};
