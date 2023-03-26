import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notify, unnotify } from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

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
    const anecdotes = useSelector(({ anecdotes, filter, notification }) => {
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
        const updatedAn = await anecdoteService.updateAnecdote(useAnecdote);

        dispatch(voteAnecdote(updatedAn));

        const message = `You voted for '${updatedAn.content}'`;
        dispatch(notify(message));
        setTimeout(() => {
            dispatch(unnotify(message));
        }, 5000);
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
