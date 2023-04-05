import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import PropTypes from "prop-types";
import { updateBlog, removeBlog } from "../requests/blogRequest";

const ButtonBlog = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};
ButtonBlog.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};
ButtonBlog.displayName = "ButtonBlog";

const Blog = ({ user, blog, displayMessage }) => {
    const [toggleDetails, setToggleDetails] = useState(false);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleToggle = () => {
        setToggleDetails(!toggleDetails);
    };
    const text = toggleDetails ? "hide" : "show";

    const queryClient = useQueryClient();

    const likeBlogMutation = useMutation(updateBlog, {
        onSuccess: () => {
            const blogs = queryClient.getQueryData("blogs");
            queryClient.setQueryData(
                "blogs",
                blogs.map(
                    (b) =>
                        b.id !== blog.id
                            ? b
                            : { ...blog, likes: blog.likes + 1 }
                    //i have blog here because its populated with user
                )
            );
            displayMessage("SUCCESS", `Liked '${blog.title}'`);
        },
    });
    const handleLike = () => {
        console.log(blog);
        const likedBlog = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1,
        };
        console.log(likedBlog);
        likeBlogMutation.mutate(likedBlog);
    };

    const deleteBlogMutation = useMutation(removeBlog, {
        onSuccess: () => {
            const blogs = queryClient.getQueryData("blogs");
            queryClient.setQueryData(
                "blogs",
                blogs.filter((b) => b.id !== blog.id)
            );
            displayMessage("SUCCESS", `Deleted '${blog.title}'`);
        },
    });
    const handleDelete = () => {
        deleteBlogMutation.mutate(blog.id);
    };
    if (toggleDetails) {
        return (
            <div style={blogStyle} className="blog">
                <div>
                    &apos;{blog.title}&apos; by {blog.author}{" "}
                    <ButtonBlog text={text} handleClick={handleToggle} />
                    <br></br>
                    url: {blog.url}
                    <br></br>
                    likes: {blog.likes}
                    <ButtonBlog text="like" handleClick={handleLike} />
                    <br></br>
                    user: {blog.user.name}
                </div>
                {user.username === blog.user.username ? (
                    <div>
                        <ButtonBlog text="remove" handleClick={handleDelete} />
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div style={blogStyle} className="blog">
            &apos;{blog.title}&apos; by {blog.author}{" "}
            <ButtonBlog text={text} handleClick={handleToggle} />
        </div>
    );
};

Blog.propTypes = {
    user: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired,
    // handleLike: PropTypes.func.isRequired,
    // handleDelete: PropTypes.func.isRequired,
};
Blog.displayName = "Blog";

export default Blog;
