import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./userDetails/userDetail.js";

export const store = configureStore({
    reducer: {
        userData: userSlice.reducer,
    },
})
