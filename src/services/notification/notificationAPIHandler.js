import toast from "react-hot-toast";
import { APIHandler } from "../../utils/axiosInstance";
import { setConsNotifications } from "../../store/reducers/slices/consumerSlice";
import { setRetaNotifications } from "../../store/reducers/slices/retailerSlice";
import { setManuNotifications } from "../../store/reducers/slices/manufacturer";

export const markNotificationAsReadAPIHandler =
  (data, token) => async (dispatch, getState) => {
    try {
      const response = await APIHandler(
        "POST",
        "/notification/mark-as-read",
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        const acType = getState().auth.accountType;
        if (acType === "consumer") {
          dispatch(setConsNotifications(response.data.data));
        } else if (acType === "retailer") {
          dispatch(setRetaNotifications(response.data.data));
        } else if (acType === "manufacturer") {
          dispatch(setManuNotifications(response.data.data));
        }
        toast.success("Marked as read!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return;
    }
  };
