import { useState } from "react";

const ButtonBlog = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Blog = ({ user, blog, handleLike, handleDelete }) => {
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

    const likeBlog = () => {
        const likedBlog = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1,
        };
        handleLike(likedBlog);
    };
    const deleteBlog = () => {
        handleDelete(blog);
    };
    if (toggleDetails) {
        return (
            <div style={blogStyle}>
                <div>
                    '{blog.title}' by {blog.author}{" "}
                    <ButtonBlog text={text} handleClick={handleToggle} />
                    <br></br>
                    url: {blog.url}
                    <br></br>
                    likes: {blog.likes}
                    <ButtonBlog text="like" handleClick={likeBlog} />
                    <br></br>
                    user: {blog.user.name}
                </div>
                {user.username === blog.user.username ? (
                    <div>
                        <ButtonBlog text="remove" handleClick={deleteBlog} />
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div style={blogStyle}>
            '{blog.title}' by {blog.author}{" "}
            <ButtonBlog text={text} handleClick={handleToggle} />
        </div>
    );
};

export default Blog;
