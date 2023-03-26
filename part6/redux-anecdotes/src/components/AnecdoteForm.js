import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify, unnotify } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const body = event.target.anecdote.value;

        const newAnecdote = await anecdoteService.createNew(body);
        console.log("create", newAnecdote);
        event.target.anecdote.value = "";
        dispatch(createAnecdote(newAnecdote));

        const message = `You added '${body}'`;
        dispatch(notify(message));
        setTimeout(() => {
            dispatch(unnotify(message));
        }, 5000);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
