import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notify(state, action) {
            return action.payload;
        },
        unnotify(state, action) {
            return initialState;
        },
    },
});

export const { notify, unnotify } = notificationSlice.actions;
export default notificationSlice.reducer;
