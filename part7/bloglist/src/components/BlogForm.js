import { useDispatch } from "react-redux";

import { useField } from "../hooks";

import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ toggle }) => {
    const { reset: resetTitle, ...title } = useField("text", "title");
    const { reset: resetAuthor, ...author } = useField("text", "author");
    const { reset: resetUrl, ...url } = useField("text", "url");

    const dispatch = useDispatch();

    const addBlog = async (event) => {
        event.preventDefault();

        dispatch(
            createBlog({
                title: title.value,
                author: author.value,
                url: url.value,
            })
        );

        resetTitle();
        resetAuthor();
        resetUrl();
        toggle();
        dispatch(
            setNotification(
                `A new blog '${title.value}' by ${author.value} was added`,
                4,
                "success"
            )
        );
    };

    return (
        <form onSubmit={addBlog}>
            <p>
                <input id="title" {...title} />
                <br></br>
                <input id="author" {...author} />
                <br></br>
                <input id="url" {...url} />
                <br></br>
            </p>
            <button id="submit-blog" type="submit">
                create
            </button>
            <button
                id="clear-blog"
                type="button"
                onClick={() => {
                    resetTitle();
                    resetAuthor();
                    resetUrl();
                }}>
                reset
            </button>
        </form>
    );
};

export default BlogForm;
