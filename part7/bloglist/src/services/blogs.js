import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };
    await axios.delete(`${baseUrl}/${id}`, config);
};

const comment = async (id, newComment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, newComment);
    return response.data;
};

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    comment,
    setToken,
};
