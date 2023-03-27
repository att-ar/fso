import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
    // console.log(anecdote.content);
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
    //need to filter based on state.filter
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === "") {
            return anecdotes;
        }
        return anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        );
    });
    const dispatch = useDispatch();

    const vote = async (anecdote) => {
        console.log("vote", anecdote.id);
        const useAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        dispatch(voteAnecdote(useAnecdote));

        const message = `You voted for '${useAnecdote.content}'`;
        dispatch(setNotification(message, 5));
    };
    // the id is passed to vote inside Anecdote
    return (
        <>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleVote={() => vote(anecdote)}
                    />
                ))}
        </>
    );
};

export default AnecdoteList;
