import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        removeUser() {
            return null;
        },
    },
});

export const { setUser, removeUser } = loginSlice.actions;

export const initializeUser = (windowItem = "loggedBlogappUser") => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem(windowItem);
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    };
};

export const loginUser = (userObject, windowItem = "loggedBlogappUser") => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(userObject);
            window.localStorage.setItem(windowItem, JSON.stringify(user));
            blogService.setToken(user.token);
            dispatch(setUser(user));
        } catch (exception) {
            dispatch(setNotification("wrong credentials", 4, "error"));
        }
    };
};

export const logoutUser = (windowItem = "loggedBlogappUser") => {
    return (dispatch) => {
        //i don't think i need async here
        blogService.setToken(null);
        dispatch(setUser(null));
        window.localStorage.removeItem(windowItem);
    };
};

export default loginSlice.reducer;
