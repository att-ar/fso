import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notify(state, action) {
            return action.payload;
        },
        //ignores unnotifies from overwritten notifs
        unnotify(state, action) {
            if (state === action.payload) {
                return initialState;
            }
            return state;
        },
    },
});

export const { notify, unnotify } = notificationSlice.actions;
export default notificationSlice.reducer;
