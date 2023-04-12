import { useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

import { Routes, Route, Link } from "react-router-dom";

const App = () => {
    const [token, setToken] = useState(null);
    const client = useApolloClient();
    // const linkSpace = {
    //     margin: 5,
    //     padding: 4,
    //     borderRadius: 6,
    //     textDecoration: "none",
    //     background: "lightgreen",
    //     fontSize: 17,
    //     fontWeight: "bold",
    // };

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
            <div className="nav">
                <Link className="link" to="/">
                    authors
                </Link>
                <Link className="link" to="/books">
                    books
                </Link>
                {!token ? (
                    <Link className="log" to="/login">
                        login
                    </Link>
                ) : (
                    <>
                        <Link className="link" to="/add">
                            add
                        </Link>
                        <Link className="link" to="/recs">
                            recommended
                        </Link>
                        <button className="log" onClick={logout}>
                            logout
                        </button>
                    </>
                )}
            </div>
            <Routes>
                <Route path="/" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                {token && (
                    <>
                        <Route path="/add" element={<NewBook />} />
                        <Route path="/recs" element={<Recommendations />} />
                    </>
                )}
                <Route
                    path="/login"
                    element={<LoginForm setToken={setToken} />}
                />
            </Routes>
        </div>
    );
};

export default App;
