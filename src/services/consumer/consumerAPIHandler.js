// API calls for consumer services

import toast from "react-hot-toast";
import { setLoading } from "../../store/reducers/slices/authSlice";
import { APIHandler } from "../../utils/axiosInstance";
import {
  setConsClaimedWarrantyData,
  setRegisteredWarramtyData,
} from "../../store/reducers/slices/consumerSlice";

// register warranty api handler
export const registerWarrantyAPIHandler =
  (data, token, navigate) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await APIHandler(
        "POST",
        "/consumer-services/register-warranty",
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.data.success) {
        navigate("/consumer-dashboard/consumer-registered-warranties");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(setLoading(false));
      return;
    }
    dispatch(setLoading(false));
    toast.success("Warranty Registered!");
  };

// claim warranty api handler
export const claimWarrantyAPIHandler =
  (data, token, navigate) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await APIHandler(
        "POST",
        "/consumer-services/claim-warranty",
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.data.success) {
        navigate(`/consumer/view-claim/${response.data?.claimId}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(setLoading(false));
      return;
    }
    dispatch(setLoading(false));
    toast.success("Warranty Claimed!");
  };

// fetch all claimed warranties of consumer
export const getClaimWarrantyAPIHandler = (token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await APIHandler(
      "GET",
      "/consumer-services/get-claimed-warranty",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    dispatch(setConsClaimedWarrantyData(response.data.data));
  } catch (error) {
    toast.error(error.response.data.message);
  }
  dispatch(setLoading(false));
};

// fetch all registered warranties of consumer
export const getRegisteredWarrantyAPIHandler = (token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await APIHandler(
      "GET",
      "/consumer-services/get-registered-warranty",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    dispatch(setRegisteredWarramtyData(response.data.data));
  } catch (error) {
    toast.error(error.response.data.message);
  }
  dispatch(setLoading(false));
};