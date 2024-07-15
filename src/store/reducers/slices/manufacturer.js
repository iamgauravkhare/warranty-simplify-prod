import { createSlice } from "@reduxjs/toolkit";

export const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState: {
    manufacturerData: null,
    claimedWarrantyData: null,
    notifications: null,
  },
  reducers: {
    setManufacturerData: (state, action) => {
      state.manufacturerData = action.payload;
    },
    setManuClaimedWarrantyData: (state, action) => {
      state.claimedWarrantyData = action.payload;
    },
    setManuNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setManufacturerData,
  setManuClaimedWarrantyData,
  setManuNotifications,
} = manufacturerSlice.actions;

export default manufacturerSlice.reducer;
