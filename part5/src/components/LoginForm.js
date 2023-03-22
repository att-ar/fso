import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ getUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        getUser({ username, password });
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({ target: { value } }) => setUsername(value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    getUser: PropTypes.func.isRequired,
};

LoginForm.displayName = "LoginForm";

export default LoginForm;
