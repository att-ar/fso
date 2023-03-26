const filterReducer = (state = "", action) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        default:
            return state;
    }
};

export const filterSet = (newFilter) => {
    return {
        type: "SET",
        payload: newFilter,
    };
};

export default filterReducer;
