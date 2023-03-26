import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState,
    reducers: {
        createAnecdote(state, action) {
            const anecdote = action.payload;
            state.push(asObject(anecdote));
        },

        voteAnecdote(state, action) {
            const id = action.payload;
            return state
                .map((an) =>
                    an.id !== id ? an : { ...an, votes: an.votes + 1 }
                )
                .sort((a, b) => b.votes - a.votes);
        },
    },
});

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
// const anecdoteReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "NEW_ANECDOTE":
//             return [...state, action.payload];

//         case "VOTE":
//             //sort in order of votes
//             const id = action.payload.id;
//             return state
//                 .map((an) =>
//                     an.id !== id ? an : { ...an, votes: an.votes + 1 }
//                 )
//                 .sort((a, b) => b.votes - a.votes);

//         default:
//             return state;
//     }
// };

// export default anecdoteReducer;

// //action creator functions
// export const createAnecdote = (anecdote) => {
//     return {
//         type: "NEW_ANECDOTE",
//         payload: asObject(anecdote),
//     };
// };
// export const voteAnecdote = (id) => {
//     return {
//         type: "VOTE",
//         payload: { id },
//     };
// };
