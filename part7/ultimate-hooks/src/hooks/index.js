import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

const generateId = () => Number(Math.random() * 10000);

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    const getAll = () => {
        axios.get(baseUrl).then((res) => {
            setResources(res.data);
        });
    };

    const getOne = (resourceId) => {
        axios
            .get(`${baseUrl}/${resourceId}`)
            .then((res) => res.data)
            .catch((e) => e.data.message);
    };

    const create = (resource) => {
        const id = generateId();
        axios
            .post(baseUrl, { ...resource, id })
            .then((res) => setResources(resources.concat(res.data)));
    };

    const remove = (resourceId) => {
        axios.delete(`${baseUrl}/${resourceId}`).then((res) => {
            setResources(resources.filter((r) => r.id !== resourceId));
        });
    };

    const update = (resource) => {
        axios
            .put(`${baseUrl}/${resource.id}`, resource)
            .then((res) =>
                setResources(
                    resources.map((r) => (r.id !== resource.id ? r : res.data))
                )
            )
            .catch((e) => e.data.message);
    };

    useEffect(() => {
        axios.get(baseUrl).then((res) => {
            setResources(res.data);
        });
    }, [baseUrl]);

    const service = {
        getAll,
        getOne,
        create,
        remove,
        update,
    };

    return [resources, service];
};
