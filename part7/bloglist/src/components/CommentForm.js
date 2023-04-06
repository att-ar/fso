import { useDispatch } from "react-redux";

import { useField } from "../hooks";
import { commentBlog } from "../reducers/blogReducer";

const CommentForm = ({ id }) => {
    const { reset: resetComment, ...comment } = useField("text", "new comment");

    const dispatch = useDispatch();

    const addComment = async (event) => {
        event.preventDefault();
        dispatch(commentBlog(id, { data: comment.value }));
        resetComment();
    };

    return (
        <form onSubmit={addComment}>
            <input id="comment" {...comment} />
            <button id="submit-comment">comment</button>
        </form>
    );
};

export default CommentForm;
