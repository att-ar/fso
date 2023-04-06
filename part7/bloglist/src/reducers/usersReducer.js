import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
    name: "users",
    initialState: [],
    //reducers define how to change the store
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
    },
});

export const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
    return async (dispatch) => {
        const blogs = await userService.getAll();
        dispatch(setUsers(blogs));
    };
};

export default userSlice.reducer;
