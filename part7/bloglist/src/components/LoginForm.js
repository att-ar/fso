// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";

import { loginUser } from "../reducers/loginReducer";

const LoginForm = () => {
    const { reset: resetUsername, ...username } = useField("text", "");
    const { reset: resetPassword, ...password } = useField("password", "");

    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(
            loginUser({
                username: username.value,
                password: password.value,
            })
        );
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
