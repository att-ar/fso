import { useState, useEffect, useRef } from "react";
// import DOMPurify from "dompurify";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { useNotifDispatch } from "./NotificationContext";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        const fetchBlogs = async () => {
            const allBlogs = await blogService.getAll();
            setBlogs(allBlogs);
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

    const notifDispatch = useNotifDispatch();

    const displayMessage = (type, payload) => {
        notifDispatch({ type, payload });
        setTimeout(() => {
            notifDispatch({ type: "CLEAR", payload });
        }, 4000);
    };

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
            displayMessage("SUCCESS", "Logged in");
        } catch (exception) {
            displayMessage("ERROR", "wrong credentials");
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        blogService.setToken(null);
        setUser(null);
        window.localStorage.removeItem("loggedBlogappUser");
        displayMessage("SUCCESS", "Logged out");
    };

    // passed to BlogForm
    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility();
        const returnedBlog = await blogService.create(blogObject);
        const completeBlog = await blogService.getOne(returnedBlog.id);
        // completeBlog.user is populated with the data from the correct user
        setBlogs(blogs.concat(completeBlog));
        displayMessage(
            "SUCCESS",
            `A new blog '${returnedBlog.title}' by ${returnedBlog.author} was added`
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
        displayMessage("SUCCESS", `Liked ${completeBlog.title}`);
    };

    const handleDelete = async (deletedBlog) => {
        if (
            window.confirm(
                `Remove ${deletedBlog.title} by ${deletedBlog.author}?`
            )
        ) {
            await blogService.remove(deletedBlog.id);
            displayMessage(
                "SUCCESS",
                `Deleted ${deletedBlog.title} by ${deletedBlog.author}`
            );
            setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id));
        }
    };

    if (!user) {
        return (
            <div>
                <Notification />
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
            <Notification />
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
