import axios from "axios";
const baseUrl = "/api/blogs";

// !!!!!!!!!!!
// need to be functions that return promises

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data);

export const getOneBlog = (id) =>
    axios.get(`${baseUrl}/${id}`).then((res) => res.data);

export const createBlog = (newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.post(baseUrl, newObject, config).then((res) => res.data);
};

export const updateBlog = (newObject) => {
    return axios
        .put(`${baseUrl}/${newObject.id}`, newObject)
        .then((res) => res.data);
};

export const removeBlog = (id) => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.delete(`${baseUrl}/${id}`, config);
};

export default {
    setToken,
};
