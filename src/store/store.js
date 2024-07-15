import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/slices/authSlice";
import consumerReducer from "./reducers/slices/consumerSlice";
import retailerReducer from "./reducers/slices/retailerSlice";
import manufacturerReducer from "./reducers/slices/manufacturer";

export default configureStore({
  reducer: {
    auth: authReducer,
    consumer: consumerReducer,
    retailer: retailerReducer,
    manufacturer: manufacturerReducer,
  },
});
