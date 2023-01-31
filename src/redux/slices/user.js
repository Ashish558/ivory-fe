import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   id: '',
   loggedIn: false
};

const user = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateLoggedIn: (state, { payload }) => {
         state.loggedIn = payload.loggedIn;
      },
   
   },
});

export const { updateLoggedIn } = user.actions;
export default user.reducer;
