import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    //reducers define how to change the store
    reducers: {
        updateBlog(state, action) {
            const updateBlog = action.payload;
            console.log(updateBlog);
            return state.map((blog) =>
                blog.id !== updateBlog.id ? blog : updateBlog
            );
        },

        appendBlog(state, action) {
            state.push(action.payload);
        },

        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload);
        },

        setBlogs(state, action) {
            return action.payload;
        },
    },
});

export const { updateBlog, appendBlog, removeBlog, setBlogs } =
    blogSlice.actions;

// action creators (these are Redux thunk though)
// are for using the reducers with actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (content) => {
    return async (dispatch) => {
        const blog = await blogService.create(content);
        const populatedBlog = await blogService.getOne(blog.id);
        // populatedBlog.user is populated with the data from the correct user
        dispatch(appendBlog(populatedBlog));
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id);
        dispatch(removeBlog(id));
    };
};

export const likeBlog = (id, blog) => {
    return async (dispatch) => {
        console.log(blog);
        await blogService.update(id, blog);
        const populatedBlog = await blogService.getOne(id);
        dispatch(updateBlog(populatedBlog));
    };
};

export default blogSlice.reducer;
