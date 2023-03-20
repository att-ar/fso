import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                "loggedNoteappUser",
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (error) {
            displayMessage(`Wrong username or password`, setErrorMessage);
            setPassword("");
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        blogService.setToken(null);
        setUser(null);
        window.localStorage.removeItem("loggedNoteappUser");
    };

    const handleTitleChange = (event) => {
        event.preventDefault();
        const updatedTitle = event.target.value;
        setNewTitle(updatedTitle);
        console.log(updatedTitle);
    };
    const handleAuthorChange = (event) => {
        event.preventDefault();
        const updatedAuthor = event.target.value;
        setNewAuthor(updatedAuthor);
        console.log(updatedAuthor);
    };
    const handleUrlChange = (event) => {
        event.preventDefault();
        const updatedUrl = event.target.value;
        setNewUrl(updatedUrl);
        console.log(updatedUrl);
    };

    const addBlog = async (event) => {
        event.preventDefault();
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        };
        const returnedBlog = await blogService.create(blogObject);
        setBlogs(blogs.concat(returnedBlog));
        setNewAuthor("");
        setNewTitle("");
        setNewUrl("");

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
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
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
                <BlogForm
                    addBlog={addBlog}
                    newTitle={newTitle}
                    newAuthor={newAuthor}
                    newUrl={newUrl}
                    handleTitleChange={handleTitleChange}
                    handleAuthorChange={handleAuthorChange}
                    handleUrlChange={handleUrlChange}
                />
            </div>
        </div>
    );
};

export default App;
