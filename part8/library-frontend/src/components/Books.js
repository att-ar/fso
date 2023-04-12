import { useQuery } from "@apollo/client";
import { useState } from "react";

import { ALL_BOOKS } from "../queries";

const FilterBar = ({ genres, setFilter }) => {
    // all genres sets the filter to "" so that everything passes
    return genres.map((g) => (
        <button key={g} onClick={() => setFilter(g === "all genres" ? "" : g)}>
            {g}
        </button>
    ));
};

const Books = () => {
    const [filter, setFilter] = useState(null);
    const result = useQuery(ALL_BOOKS);
    if (result.loading) {
        return <div>loading...</div>;
    }

    const books = result.data.allBooks;

    //returns the non duplicates, by checking if the occurence of a value is the first
    // occurrence in an array, got this from stackoverflow
    const onlyUnique = (value, index, array) => array.indexOf(value) === index;
    const genres = books.map((b) => b.genres);
    //flat brings the nested components to the surface array
    const uniqueGenres = genres.flat().filter(onlyUnique);
    uniqueGenres.push("all genres");

    return (
        <div>
            <h2>books</h2>
            <p>{filter ? `In genre ${filter}` : "In all genres"}</p>
            <FilterBar genres={uniqueGenres} setFilter={setFilter} />
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books
                        .filter((b) =>
                            filter ? b.genres.includes(filter) : true
                        )
                        .map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
