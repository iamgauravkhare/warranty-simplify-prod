import { createSlice } from "@reduxjs/toolkit";

export const retailerSlice = createSlice({
  name: "retailer",
  initialState: {
    retailerData: null,
    claimedWarrantyData: null,
    notifications: null,
    associatedBrands: null,
  },
  reducers: {
    setRetailerData: (state, action) => {
      state.retailerData = action.payload;
    },
    setRetaClaimedWarrantyData: (state, action) => {
      state.claimedWarrantyData = action.payload;
    },
    setRetaNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setAssociatedBrands: (state, action) => {
      state.associatedBrands = action.payload;
    },
  },
});

export const {
  setRetailerData,
  setRetaClaimedWarrantyData,
  setRetaNotifications,
  setAssociatedBrands,
} = retailerSlice.actions;

export default retailerSlice.reducer;
