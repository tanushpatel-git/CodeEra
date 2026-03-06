import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userDetail",
    initialState: {
        user: {
            name: "",
            email: "",
        }
    },
    reducers: {
        updateUser: (state, action) => {
            state.user.name = action.payload;
        },
        updateEmail: (state, action) => {
            state.user.email = action.payload;
        }
    }
})

export const { updateUser, updateEmail } = userSlice.actions;

export default userSlice.reducer;