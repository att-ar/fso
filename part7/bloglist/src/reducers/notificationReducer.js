import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", status: "" };

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notify(state, action) {
            console.log(action.payload);
            return action.payload;
        },
        //ignores unnotifies from overwritten notifs
        unnotify(state, action) {
            console.log(JSON.parse(JSON.stringify(state)));
            console.log(action.payload);
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
