import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

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
            </div>
        );
    }
    return null;
};

Blog.displayName = "Blog";

export default Blog;
