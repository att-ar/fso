import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (content) => {
    const object = { content, votes: 0 };
    //no config object as third arg needed for now
    const response = await axios.post(baseUrl, object);
    return response.data;
};

const updateAnecdote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return response.data;
};

const anecdoteService = { getAll, createNew, updateAnecdote };
export default anecdoteService;
