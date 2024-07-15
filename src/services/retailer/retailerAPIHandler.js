// API calls for retailer services

import toast from "react-hot-toast";
import { APIHandler } from "../../utils/axiosInstance";
import {
  setAssociatedBrands,
  setRetaClaimedWarrantyData,
} from "../../store/reducers/slices/retailerSlice";
import { setLoading } from "../../store/reducers/slices/authSlice";

// create associated brands api handler
export const setRetailerAssociations = (data, token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await APIHandler(
      "POST",
      "/retailer-services/set-brand-associations",
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.data.success === true) {
      dispatch(setAssociatedBrands(response.data.data));
      toast.success("Brands added successfully");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
  dispatch(setLoading(false));
};

// fetch all claimed warranties data for retailer
export const getRetailerClaimWarrantyAPIHandler =
  (token) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await APIHandler(
        "GET",
        "/retailer-services/claimed-warranties",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(setRetaClaimedWarrantyData(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };

// fetch all associated brands with retailer
export const getRetailerAssociationsAPIHandler =
  (token) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await APIHandler(
        "GET",
        "/retailer-services/retailer-associations",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(setAssociatedBrands(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
