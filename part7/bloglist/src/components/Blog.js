import { useState } from "react";
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
    const [toggleDetails, setToggleDetails] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const dispatch = useDispatch();

    const handleToggle = () => {
        setToggleDetails(!toggleDetails);
    };

    const text = toggleDetails ? "hide" : "show";

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
        dispatch(deleteBlog(blog.id));
        dispatch(setNotification(`Delete ${blog.title}`, 4, "success"));
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
};
Blog.displayName = "Blog";

export default Blog;
