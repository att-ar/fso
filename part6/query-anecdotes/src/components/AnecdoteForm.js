import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotifDispatch } from "../AnecdoteContext";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotifDispatch();

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData("anecdotes");
            queryClient.setQueryData(
                "anecdotes",
                anecdotes.concat(newAnecdote)
            );
            dispatch({ type: "CREATE", payload: newAnecdote.content });
            setTimeout(() => {
                dispatch({
                    type: "CLEAR",
                    payload: newAnecdote.content,
                });
            }, 5000);
        },
        onError: (error) => {
            dispatch({ type: "ERROR", payload: error.response.data.error });
            setTimeout(() => {
                dispatch({
                    type: "CLEAR",
                    payload: error.response.data.error,
                });
            }, 5000);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        newAnecdoteMutation.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
