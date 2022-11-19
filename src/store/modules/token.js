import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: "token",
  initialState: { 
    accessToken: "",
    refreshToken: ""
  },
  reducers: {
    refresh:(state, action) => {
      state = action.payload
    },
  },
});

export default tokenSlice.reducer;