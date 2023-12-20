import { TOKEN, USER_ROLE } from "../constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem(TOKEN) ? localStorage.getItem(TOKEN) : null,
  userRole: localStorage.getItem(USER_ROLE)
    ? localStorage.getItem(USER_ROLE)
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.extractedValue;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
