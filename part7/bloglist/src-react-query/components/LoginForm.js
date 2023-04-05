import { useField } from "../hooks";
import { useUserDispatch } from "../contexts/UserContext";
import blogRequest from "../requests/blogRequest";

import loginService from "../services/login";

const LoginForm = ({ displayMessage }) => {
    const { reset: resetUsername, ...username } = useField("text", "username");
    const { reset: resetPassword, ...password } = useField(
        "password",
        "password"
    );
    const userDispatch = useUserDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value,
            });
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            );
            blogRequest.setToken(user.token);
            userDispatch({ type: "SET", payload: user });
            displayMessage("SUCCESS", "Logged in");
        } catch (exception) {
            displayMessage("ERROR", "wrong credentials");
        } finally {
            resetUsername();
            resetPassword();
        }
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
            </form>
        </div>
    );
};

LoginForm.displayName = "LoginForm";

export default LoginForm;
