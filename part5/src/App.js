import { useState, useEffect, useRef } from "react";
// import DOMPurify from "dompurify";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        const fetchBlogs = async () => {
            const allBlogs = await blogService.getAll();
            setBlogs(allBlogs);
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const displayMessage = (message, setter) => {
        setter(message);
        setTimeout(() => {
            setter(null);
        }, 4000);
    };

    // passed to LoginForm
    const loginUser = async (userObject) => {
        try {
            const user = await loginService.login(userObject);
            window.localStorage.setItem(
                "loggedNoteappUser",
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
        } catch (exception) {
            displayMessage("wrong credentials", setErrorMessage);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        blogService.setToken(null);
        setUser(null);
        window.localStorage.removeItem("loggedNoteappUser");
    };

    // passed to BlogForm
    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility();
        const returnedBlog = await blogService.create(blogObject);
        setBlogs(blogs.concat(returnedBlog));
        displayMessage(
            `A new blog '${returnedBlog.title}' by ${returnedBlog.author} was added`,
            setSuccessMessage
        );
    };

    if (!user) {
        return (
            <div>
                <Notification message={errorMessage} className="error" />
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
            <Notification message={successMessage} className="success" />
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>log out</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <td>
                            <u>Title</u>
                        </td>
                        <td>
                            <u>Author</u>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </tbody>
            </table>

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
