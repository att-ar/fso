import { useMutation, useQueryClient } from "react-query";
import { createBlog } from "../requests/blogRequest";

import PropTypes from "prop-types";
import { useField } from "../hooks";
import { useUserValue } from "../contexts/UserContext";

const BlogForm = ({ toggleForm, displayMessage }) => {
    const { reset: resetTitle, ...title } = useField("text", "title");
    const { reset: resetAuthor, ...author } = useField("text", "author");
    const { reset: resetUrl, ...url } = useField("text", "url");
    const user = useUserValue();

    const queryClient = useQueryClient();

    const newBlogMutation = useMutation(createBlog, {
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData("blogs");
            queryClient.setQueryData(
                "blogs",
                blogs.concat({
                    ...newBlog,
                    user: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                    },
                })
            );
            displayMessage(
                "SUCCESS",
                `A new blog '${newBlog.title}' by ${newBlog.author} was added`
            );
        },
        onError: (error) => {
            displayMessage("ERROR", error.response.data.error);
        },
    });

    const addBlog = (event) => {
        event.preventDefault();

        // const populatedBlog = populateBlog({ title, author, url });
        newBlogMutation.mutate({
            title: title.value,
            author: author.value,
            url: url.value,
        });

        resetTitle();
        resetAuthor();
        resetUrl();
        toggleForm();
    };

    return (
        <form onSubmit={addBlog}>
            <p>
                title: <input id="title" {...title} />
                <br></br>
                author: <input id="author" {...author} />
                <br></br>
                url: <input id="url" {...url} />
                <br></br>
            </p>
            <button id="submit-blog" type="submit">
                create
            </button>
        </form>
    );
};

BlogForm.propTypes = {
    displayMessage: PropTypes.func.isRequired,
};

BlogForm.displayName = "BlogForm";

export default BlogForm;
