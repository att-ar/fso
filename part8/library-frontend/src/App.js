import { useApolloClient, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import Notification from "./components/Notification";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);
    const client = useApolloClient();

    useEffect(() => {
        const prevToken = localStorage.getItem("book-user-token");
        if (prevToken) setToken(prevToken);
    }, []);

    useSubscription(BOOK_ADDED, {
        onData: ({ data, client }) => {
            const addedBook = data.data.bookAdded;
            notify(`${addedBook.title} by ${addedBook.author.name} was added`);
            //for some reason it tries this twice in a row, and one of the attempts
            // the query is empty, so the try catch block just ignores the invalid attempt
            try {
                client.cache.updateQuery(
                    { query: ALL_BOOKS, variables: { bookFilter: {} } },
                    (data) => {
                        return { allBooks: data.allBooks.concat(addedBook) };
                    }
                );
            } catch (exception) {}
        },
    });

    const notify = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

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
            <div>
                <Notification message={message} />
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
