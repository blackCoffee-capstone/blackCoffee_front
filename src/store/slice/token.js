import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: "token",
  initialState: { 
    accessToken: "",
    refreshToken: ""
  },
  reducers: {
    refresh:(state, action) => {
      state.accessToken = action.payload
    },
  },
});

export const { refresh } = tokenSlice.actions;
export default tokenSlice.reducer;