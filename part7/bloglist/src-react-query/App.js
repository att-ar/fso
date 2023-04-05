import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { useNotifDispatch } from "./contexts/NotificationContext";
import { useUserDispatch, useUserValue } from "./contexts/UserContext";
import blogRequest, { getBlogs } from "./requests/blogRequest";

const App = () => {
    const userDispatch = useUserDispatch();
    const user = useUserValue();
    const blogFormRef = useRef();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            userDispatch({ type: "SET", payload: user });
            blogRequest.setToken(user.token);
        }
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        blogRequest.setToken(null);
        userDispatch({ type: "REMOVE" });
        window.localStorage.removeItem("loggedBlogappUser");
        displayMessage("SUCCESS", "Logged out");
    };

    const result = useQuery("blogs", getBlogs, {
        refetchOnWindowFocus: false,
        retry: 1,
    });
    if (result.isLoading) {
        return <div>loading data...</div>;
    }
    if (result.isError) {
        return <div>blog service not available due to problems in server</div>;
    }
    //at this point the result is in success state
    const blogs = result.data;

    const notifDispatch = useNotifDispatch();
    const displayMessage = (type, payload) => {
        notifDispatch({ type, payload });
        setTimeout(() => {
            notifDispatch({ type: "CLEAR", payload });
        }, 4000);
    };

    // passed to BlogForm
    const toggleBlogForm = () => {
        blogFormRef.current.toggleVisibility();
    };

    if (!user) {
        return (
            <div>
                <Notification />
                <h2>Log in to application</h2>
                <Togglable buttonLabel="log in">
                    <LoginForm displayMessage={displayMessage} />
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
                                displayMessage={displayMessage}
                            />
                        );
                    })}
            </div>
            <h2>create new</h2>
            <div>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                    <BlogForm
                        toggleForm={toggleBlogForm}
                        user={user}
                        displayMessage={displayMessage}
                    />
                </Togglable>
            </div>
        </div>
    );
};

export default App;
