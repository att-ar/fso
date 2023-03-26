import { useSelector, useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify, unnotify } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const notif = useSelector(({ notification }) => notification);
    const dispatch = useDispatch();

    const addAnecdote = (event) => {
        event.preventDefault();
        const body = event.target.anecdote.value;
        console.log("create", body);
        event.target.anecdote.value = "";
        dispatch(createAnecdote(body));
        if (notif) {
            //overwrite existing notif
            dispatch(unnotify());
        }
        dispatch(notify(`You added '${body}'`));
        setTimeout(() => {
            dispatch(unnotify());
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
