import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./reducers/filterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer,
    },
});

// console.log(store);
// store.subscribe(() => {
//     const anecdotes = store.getState()
// })

export default store;
