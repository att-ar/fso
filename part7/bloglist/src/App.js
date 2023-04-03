import { useState, useEffect, useRef } from "react";
// import DOMPurify from "dompurify";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    const blogFormRef = useRef();

    useEffect(() => {
        const fetchBlogs = async () => {
            const allBlogs = await blogService.getAll();
            setBlogs(allBlogs);
            console.log(allBlogs);
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    // passed to LoginForm
    const loginUser = async (userObject) => {
        try {
            const user = await loginService.login(userObject);
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
        } catch (exception) {
            dispatch(setNotification("wrong credentials", 4));
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        blogService.setToken(null);
        setUser(null);
        window.localStorage.removeItem("loggedBlogappUser");
    };

    // passed to BlogForm
    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility();
        const returnedBlog = await blogService.create(blogObject);
        const completeBlog = await blogService.getOne(returnedBlog.id);
        // completeBlog.user is populated with the data from the correct user
        setBlogs(blogs.concat(completeBlog));
        dispatch(
            setNotification(
                `A new blog '${returnedBlog.title}' by ${returnedBlog.author} was added`,
                4
            )
        );
    };

    const handleLike = async (likedBlog) => {
        await blogService.update(likedBlog.id, likedBlog);
        const completeBlog = await blogService.getOne(likedBlog.id);
        setBlogs(
            blogs.map((blog) =>
                blog.id !== completeBlog.id ? blog : completeBlog
            )
        );
        dispatch(setNotification(`Liked ${likedBlog.title}`, 2));
    };

    const handleDelete = async (deletedBlog) => {
        if (
            window.confirm(
                `Remove ${deletedBlog.title} by ${deletedBlog.author}?`
            )
        ) {
            await blogService.remove(deletedBlog.id);
            dispatch(
                setNotification(
                    `Deleted ${deletedBlog.title} by ${deletedBlog.author}`,
                    4
                )
            );
            setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id));
        }
    };

    if (!user) {
        return (
            <div>
                <Notification className="error" />
                <h2>Log in to application</h2>
                <Togglable buttonLabel="log in">
                    <LoginForm getUser={loginUser} />
                </Togglable>
            </div>
        );
    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification className="success" />
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>log out</button>
            </div>
            <div id="blogs">
                {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => {
                        return (
                            <Blog
                                key={blog.id}
                                user={user}
                                blog={blog}
                                handleLike={handleLike}
                                handleDelete={handleDelete}
                            />
                        );
                    })}
            </div>
            <h2>create new</h2>
            <div>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                </Togglable>
            </div>
        </div>
    );
};

export default App;
