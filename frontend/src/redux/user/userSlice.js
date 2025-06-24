import { createSlice } from "@reduxjs/toolkit";

// initial state for user
const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        // modifyName: (state, action) => {
        //    state.currentUser.name = action.payload;
        // }
        loginSuccessful : (state, action) => {
            state.currentUser = action.payload;
        },
        userUpdateSuccessful : (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

export const {loginSuccessful, userUpdateSuccessful} = userSlice.actions;
export default userSlice.reducer;