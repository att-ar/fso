import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNotifDispatch } from "./AnecdoteContext";

import { getAnecdotes, updatedAnecdote } from "./requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotifDispatch();

    const voteAnecdoteMutation = useMutation(updatedAnecdote, {
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData("anecdotes");
            queryClient.setQueryData(
                "anecdotes",
                anecdotes.map((an) =>
                    an.id !== updatedAnecdote.id ? an : updatedAnecdote
                )
            );
        },
    });

    const handleVote = (anecdote) => {
        console.log("vote");
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        voteAnecdoteMutation.mutate(updatedAnecdote);
        dispatch({ type: "VOTE", payload: anecdote.content });
        setTimeout(() => {
            dispatch({
                type: "CLEAR",
                payload: anecdote.content,
            });
        }, 5000);
    };

    const result = useQuery("anecdotes", getAnecdotes, {
        refetchOnWindowFocus: false,
        retry: 1,
    });

    console.log(result);

    if (result.isLoading) {
        return <div>loading data...</div>;
    }
    if (result.isError) {
        return (
            <div>anecdote service not available due to problems in server</div>
        );
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
