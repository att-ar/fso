import { useDispatch } from "react-redux";

import CommentForm from "./CommentForm";
import { LikeButton, LinkButton, DeleteButton } from "../ui-components/Buttons";

import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

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
                    <LikeButton onLike={handleLike} likes={blog.likes} />
                    <LinkButton url={blog.url} />
                    {user.username === blog.user.username ? (
                        <DeleteButton onDelete={handleDelete} />
                    ) : null}
                    <br></br>
                    <div
                        style={{
                            marginTop: 10,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}>
                        Posted by {user.name}
                    </div>
                </div>
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
