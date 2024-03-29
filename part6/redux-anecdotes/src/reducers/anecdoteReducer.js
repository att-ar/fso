import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
//     "If it hurts, do it more often",
//     "Adding manpower to a late software project makes it later!",
//     "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//     "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//     "Premature optimization is the root of all evil.",
//     "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0,
//     };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        alterAnecdote(state, action) {
            const updateAn = action.payload;
            return state.map((an) => (an.id !== updateAn.id ? an : updateAn));
        },

        appendAnecdote(state, action) {
            state.push(action.payload);
        },

        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { alterAnecdote, appendAnecdote, setAnecdotes } =
    anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(anecdote));
    };
};

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const votedAn = await anecdoteService.updateAnecdote(anecdote);
        dispatch(alterAnecdote(votedAn));
    };
};

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
