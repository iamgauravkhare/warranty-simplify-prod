import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    accountType: null,
    displayPicture: null,
  },
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAccountType: (state, action) => {
      state.accountType = action.payload;
    },
    setDisplayPicture: (state, action) => {
      state.displayPicture = action.payload;
    },
  },
});

export const { setLoading, setToken, setAccountType, setDisplayPicture } =
  authSlice.actions;

export default authSlice.reducer;
