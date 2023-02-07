import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   loggedIn: false,
   profileData:{}
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
   
   },
});

export const { updateLoggedIn, updateProfileData } = user.actions;
export default user.reducer;
