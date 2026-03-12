import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userDetail",
    initialState: {
        user: {
            name: "",
            email: "",
            image:"",
            id:"",
        }
    },
    reducers: {
        updateUser: (state, action) => {
            state.user.name = action.payload;
        },
        updateEmail: (state, action) => {
            state.user.email = action.payload;
        },
        updateId: (state, action) => {
            state.user.id = action.payload;
        },
        updateImage: (state, action) => {
            state.user.image = action.payload;
        }
    }
})

export const { updateUser, updateEmail, updateId, updateImage } = userSlice.actions;