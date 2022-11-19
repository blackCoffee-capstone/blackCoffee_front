import { createSlice } from '@reduxjs/toolkit';
export const messageBundleSlice = createSlice({
  name: "messageBundle",
  initialState: { 
    alert: "",
    confirm: {
      message: "",
      callback: null
    },
    error: "",
  },
  reducers: {
    alert:(state, action) => {
      state.alert = action.payload
    },
    confirm:(state, action) => {
      console.log(action.payload);
      state.confirm = action.payload
    },
    error:(state, action) => {
      state.error = action.payload
    },
  },
});

export const { alert, confirm, error } = messageBundleSlice.actions;
export default messageBundleSlice.reducer;