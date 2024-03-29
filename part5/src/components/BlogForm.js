import { useState } from "react";

import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const addBlog = (event) => {
        event.preventDefault();

        createBlog({ title, author, url });

        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <form onSubmit={addBlog}>
            <p>
                title:{" "}
                <input
                    id="title"
                    value={title}
                    onChange={({ target: { value } }) => {
                        setTitle(value);
                    }}
                    placeholder="title"
                />
                <br></br>
                author:{" "}
                <input
                    id="author"
                    value={author}
                    onChange={({ target: { value } }) => {
                        setAuthor(value);
                    }}
                    placeholder="author"
                />
                <br></br>
                url:{" "}
                <input
                    id="url"
                    value={url}
                    onChange={({ target: { value } }) => {
                        setUrl(value);
                    }}
                    placeholder="url"
                />
                <br></br>
            </p>
            <button id="submit-blog" type="submit">
                create
            </button>
        </form>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
};

BlogForm.displayName = "BlogForm";

export default BlogForm;
