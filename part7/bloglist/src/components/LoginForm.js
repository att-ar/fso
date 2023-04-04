// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";

import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/loginReducer";

const LoginForm = () => {
    const { reset: resetUsername, ...username } = useField("text", "username");
    const { reset: resetPassword, ...password } = useField(
        "password",
        "password"
    );

    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        try {
            dispatch(
                loginUser({
                    username: username.value,
                    password: password.value,
                })
            );
        } catch (exception) {
            dispatch(setNotification("wrong credentials", 4, "error"));
        }
        resetPassword();
        resetUsername();
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input id="username" {...username} />
                </div>
                <div>
                    password
                    <input id="password" {...password} />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
                <button
                    id="clear-login"
                    type="button"
                    onClick={() => {
                        resetPassword();
                        resetUsername();
                    }}>
                    clear
                </button>
            </form>
        </div>
    );
};

LoginForm.displayName = "LoginForm";

export default LoginForm;
