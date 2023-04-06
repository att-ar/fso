import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    // BrowserRouter as Router,
    Routes,
    Route,
    Link,
    // Navigate,
    // useParams,
    // useNavigate,
    useMatch,
} from "react-router-dom";

import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserList from "./components/UserList";
import User from "./components/User";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logoutUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { setNotification } from "./reducers/notificationReducer";

const Menu = () => {
    return (
        <>
            <Link className="menuItem" to="/">
                Blogs
            </Link>
            <Link className="menuItem" to="/users">
                Users
            </Link>
        </>
    );
};

const App = () => {
    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.users);
    const blogs = useSelector((state) => state.blogs);

    const dispatch = useDispatch();
    const blogFormRef = useRef();

    //initializes the blogs and the user so that other components can use
    // the useSelector() function to access the state in the store
    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUser());
        dispatch(initializeUsers());
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

    const byId = (id, data) => data.find((b) => b.id === id);

    const blogMatch = useMatch("/blogs/:id");
    const matchedBlog = blogMatch ? byId(blogMatch.params.id, blogs) : null;

    const userMatch = useMatch("/users/:id");
    const matchedUser = userMatch ? byId(userMatch.params.id, users) : null;

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
            <div className="menu">
                <Menu />
                <span
                    style={{
                        position: "absolute",
                        paddingTop: 2,
                        color: "white",
                        fontSize: 18,
                        right: 25,
                    }}>
                    {user.name + " logged in "}
                    <button onClick={handleLogout}>log out</button>
                </span>
            </div>
            <div style={{ padding: "5 0 5 0" }}>
                <h2>Blog App</h2>
                <Notification />
            </div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <BlogList user={user} />
                            <h2>Create New</h2>
                            <div>
                                <Togglable
                                    buttonLabel="New Blog"
                                    ref={blogFormRef}>
                                    <BlogForm toggle={addBlog} />
                                </Togglable>
                            </div>
                        </div>
                    }></Route>
                <Route
                    path="/blogs/:id"
                    element={<Blog user={user} blog={matchedBlog} />}></Route>
                <Route
                    path="/users/:id"
                    element={<User user={matchedUser} />}></Route>
                <Route path="/users" element={<UserList />}></Route>
            </Routes>
        </div>
    );
};

export default App;
