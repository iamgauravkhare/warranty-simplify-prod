import { createSlice } from "@reduxjs/toolkit";

export const consumerSlice = createSlice({
  name: "consumer",
  initialState: {
    consumerData: null,
    registeredWarramtyData: [],
    claimedWarrantyData: [],
    notifications: [],
  },
  reducers: {
    setConsumerData: (state, action) => {
      state.consumerData = action.payload;
    },
    setRegisteredWarramtyData: (state, action) => {
      state.registeredWarramtyData = action.payload;
    },
    setConsClaimedWarrantyData: (state, action) => {
      state.claimedWarrantyData = action.payload;
    },
    setConsNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setConsumerData,
  setRegisteredWarramtyData,
  setConsClaimedWarrantyData,
  setConsNotifications,
} = consumerSlice.actions;

export default consumerSlice.reducer;
