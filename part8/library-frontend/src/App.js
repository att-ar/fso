import { useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

import { Routes, Route, Link } from "react-router-dom";

const App = () => {
    const [token, setToken] = useState(null);
    const client = useApolloClient();
    const linkSpace = {
        margin: 5,
        padding: 4,
        borderRadius: 6,
        textDecoration: "none",
        background: "lightgreen",
    };

    useEffect(() => {
        const prevToken = localStorage.getItem("book-user-token");
        if (prevToken) setToken(prevToken);
    }, []);

    const logout = () => {
        setToken(null);
        localStorage.clear();
        //resetting the Apollo cache is very very important
        client.resetStore();
    };

    return (
        <div>
            <div
                style={{
                    background: "green",
                    borderRadius: 4,
                    position: "relative",
                    marginBottom: 10,
                }}>
                <Link style={linkSpace} to="/">
                    authors
                </Link>
                <Link style={linkSpace} to="/books">
                    books
                </Link>
                {!token ? (
                    <Link
                        style={{
                            ...linkSpace,
                            background: "lightcyan",
                        }}
                        to="/login">
                        login
                    </Link>
                ) : (
                    <>
                        <Link style={linkSpace} to="/add">
                            add
                        </Link>
                        <button
                            style={{
                                ...linkSpace,
                                background: "lightcyan",
                            }}
                            onClick={logout}>
                            logout
                        </button>
                    </>
                )}
            </div>
            <Routes>
                <Route path="/" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                {token && <Route path="/add" element={<NewBook />} />}
                <Route
                    path="/login"
                    element={<LoginForm setToken={setToken} />}
                />
            </Routes>
        </div>
    );
};

export default App;
