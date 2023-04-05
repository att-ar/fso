import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "react-query";
import { NotifContextProvider } from "./contexts/NotificationContext";
import { UserContextProvider } from "./contexts/UserContext";

import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserContextProvider>
        <NotifContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </NotifContextProvider>
    </UserContextProvider>
);
