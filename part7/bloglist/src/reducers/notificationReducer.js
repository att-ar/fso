import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", status: "" };

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notify(state, action) {
            return action.payload;
        },
        //ignores unnotifies from overwritten notifs
        unnotify(state, action) {
            if (state.message === action.payload) {
                return initialState;
            }
            return state;
        },
    },
});

export const { notify, unnotify } = notificationSlice.actions;

export const setNotification = (message, timeout, status) => {
    return async (dispatch) => {
        dispatch(notify({ message, status }));
        setTimeout(() => {
            dispatch(unnotify(message));
        }, timeout * 1000);
    };
};

export default notificationSlice.reducer;
