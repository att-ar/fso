import { useState, useEffect, useRef } from "react";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    const blogFormRef = useRef();

    //initializes the blogs so that other components can use
    // the useSelector() function to access state.blogs with the right blogs
    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

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
            dispatch(setNotification("wrong credentials", 4, "error"));
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        blogService.setToken(null);
        setUser(null);
        window.localStorage.removeItem("loggedBlogappUser");
    };

    // passed to BlogForm
    const addBlog = (title, author) => {
        //toggles the visiblity of the blog form and sets a notif
        blogFormRef.current.toggleVisibility();
        dispatch(
            setNotification(
                `A new blog '${title}' by ${author} was added`,
                4,
                "success"
            )
        );
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
            <BlogList user={user} />
            <h2>create new</h2>
            <div>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                    <BlogForm toggle={addBlog} />
                </Togglable>
            </div>
        </div>
    );
};

export default App;
