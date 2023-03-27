import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload;
        },
    },
});
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

// const filterReducer = (state = "", action) => {
//     switch (action.type) {
//         case "SET":
//             return action.payload;
//         default:
//             return state;
//     }
// };

// export const filterSet = (newFilter) => {
//     return {
//         type: "SET",
//         payload: newFilter,
//     };
// };

// export default filterReducer;
