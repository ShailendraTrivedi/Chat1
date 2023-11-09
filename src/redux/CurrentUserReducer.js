import { createSlice } from "@reduxjs/toolkit";

const currentUserReducer = createSlice({
  name: "current user",
  initialState: {
    user: null,
  },
  reducers: {
    addUserSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

