import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import "./index.css";

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("book-user-token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
);