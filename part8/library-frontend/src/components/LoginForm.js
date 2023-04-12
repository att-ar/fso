import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
    const { reset: resetUsername, ...username } = useField("text");
    const { reset: resetPassword, ...password } = useField("password");

    const navigate = useNavigate();

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
    });
    // Use of the effect hook is necessary to avoid an endless rendering loop.
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            //uses window.localStorage
            localStorage.setItem("book-user-token", token);
            navigate("/");
        }
    }, [result.data]); // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault();
        //modifies result.data which makes the useEffect run
        login({
            variables: { username: username.value, password: password.value },
        });
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <input {...username} placeholder="username" />
                </div>
                <div>
                    <input {...password} placeholder="password" />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
