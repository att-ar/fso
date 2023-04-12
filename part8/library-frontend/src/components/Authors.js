import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import { useState, useEffect } from "react";

import { ALL_AUTHORS, ALL_BOOKS, EDIT_BIRTH } from "../queries";

const BirthForm = ({ authors }) => {
    const [chosen, setChosen] = useState(null);
    const [year, setYear] = useState("");

    const options = authors.map((a) => ({ value: a.name, label: a.name }));
    const [editBirth, result] = useMutation(EDIT_BIRTH, {
        //updating the books query is too complicated rn
        refetchQueries: [{ query: ALL_BOOKS }],
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
        update: (cache, response) => {
            cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
                return {
                    allAuthors: allAuthors.map((a) =>
                        a.id !== response.data.editAuthor.id
                            ? a
                            : response.data.editAuthor
                    ),
                };
            });
        },
    });
    const handleSubmit = (event) => {
        event.preventDefault();

        editBirth({
            variables: { name: chosen.value, setBornTo: Number(year) },
        });

        setYear("");
    };

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            console.log("person not found");
        }
    }, [result.data]); // eslint-disable-line

    return (
        <div>
            <Select
                defaultValue={chosen}
                onChange={setChosen}
                options={options}
            />
            <form onSubmit={handleSubmit}>
                <input
                    id="birth-year"
                    type="number"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                />
                <button>Update author</button>
            </form>
        </div>
    );
};

const Authors = () => {
    const result = useQuery(ALL_AUTHORS);
    if (result.loading) {
        return <div>loading...</div>;
    }
    const authors = result.data.allAuthors;

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Set birthyear</h3>
            <BirthForm authors={authors} />
        </div>
    );
};

export default Authors;
