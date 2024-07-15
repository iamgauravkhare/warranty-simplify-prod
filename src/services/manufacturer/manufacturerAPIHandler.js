// API calls for manufacturer services

import { setManuClaimedWarrantyData } from "../../store/reducers/slices/manufacturer";
import { APIHandler } from "../../utils/axiosInstance";
import { setLoading } from "../../store/reducers/slices/authSlice";

// fetch all claimed warranties data for manufacturer
export const getManuClaimWarrantyAPIHandler = (token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await APIHandler(
      "GET",
      "/manufacturer-services/claimed-warranties",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    dispatch(setManuClaimedWarrantyData(response.data.data));
  } catch (error) {
    toast.error(error.response.data.message);
  }
  dispatch(setLoading(false));
};
