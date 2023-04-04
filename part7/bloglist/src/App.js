import { useEffect, useRef } from "react";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logoutUser } from "./reducers/loginReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const blogFormRef = useRef();

    //initializes the blogs and the user so that other components can use
    // the useSelector() function to access the state in the store
    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUser());
    }, [dispatch]);

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        dispatch(setNotification("Logged out successfully", 3, "success"));
    };

    // passed to BlogForm
    const addBlog = () => {
        //toggles the visiblity of the blog form and sets a notif
        blogFormRef.current.toggleVisibility();
    };

    if (!user) {
        return (
            <div>
                <Notification />
                <h2>Log in to application</h2>
                <Togglable buttonLabel="log in">
                    <LoginForm />
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
                <button onClick={handleLogout}> log out</button>
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
