import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVote }) => {
    console.log(handleVote);
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    );
};

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state);
    console.log(anecdotes);
    const dispatch = useDispatch();

    const vote = (id) => {
        console.log("vote", id);
        dispatch(voteAnecdote(id));
    };
    // the id is passed to vote inside Anecdote
    return (
        <>
            {anecdotes.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => vote(anecdote.id)}
                />
            ))}
        </>
    );
};

export default AnecdoteList;
