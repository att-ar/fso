import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import CommentForm from "./CommentForm";

import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const ButtonBlog = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};
ButtonBlog.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};
ButtonBlog.displayName = "ButtonBlog";

const Blog = ({ user, blog }) => {
    const dispatch = useDispatch();

    const handleLike = async () => {
        const likedBlog = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1,
        };
        dispatch(likeBlog(blog.id, likedBlog));
        dispatch(setNotification(`Liked ${blog.title}`, 2, "success"));
    };

    const handleDelete = async () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog.id));
            dispatch(setNotification(`Delete ${blog.title}`, 4, "success"));
        }
    };
    if (blog) {
        return (
            <div className="blog">
                <div>
                    <h2>
                        {blog.title} by {blog.author}
                    </h2>
                    url: <a href={blog.url}>{blog.url}</a>
                    <br></br>
                    likes: {blog.likes}
                    <ButtonBlog text="like" handleClick={handleLike} />
                    <br></br>
                    added by {blog.user.name}
                </div>
                {user.username === blog.user.username ? (
                    <div>
                        <ButtonBlog text="remove" handleClick={handleDelete} />
                    </div>
                ) : null}
                <h3>Comments</h3>
                <CommentForm id={blog.id} />
                <ul>
                    {blog.comments.map((c, idx) => (
                        <li key={idx}>{c}</li>
                    ))}
                </ul>
            </div>
        );
    }
    return null;
};

Blog.displayName = "Blog";

export default Blog;
