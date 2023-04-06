import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./store";
import App from "./App";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
