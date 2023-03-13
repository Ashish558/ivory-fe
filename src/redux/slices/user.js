import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   loggedIn: false,
   profileData:{},
   redirectAfterLogin: null
};

const user = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateLoggedIn: (state, { payload }) => {
         state.loggedIn = payload.loggedIn;
      },
      updateProfileData: (state, { payload }) => {
         state.profileData = payload.profileData;
      },
      updateRedirectAfterLogin: (state, { payload }) => {
         state.redirectAfterLogin = payload;
      },
   
   },
});

export const { updateLoggedIn, updateProfileData, updateRedirectAfterLogin } = user.actions;
export default user.reducer;
