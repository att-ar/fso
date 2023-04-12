import { useQuery } from "@apollo/client";
// import { useState, useEffect } from "react";

import { ME, ALL_BOOKS } from "../queries";

const Recommendations = () => {
    const meResult = useQuery(ME);
    const bookResult = useQuery(ALL_BOOKS);
    if (meResult.loading) {
        return <div>loading...</div>;
    }
    if (bookResult.loading) {
        return <div>loading...</div>;
    }
    const me = meResult.data.me;
    const books = bookResult.data.allBooks;

    const filteredBooks = books.filter((b) =>
        b.genres.includes(me.favoriteGenre)
    );
    return (
        <div>
            <h2>Recommendations</h2>
            <p>
                Books in the genre <strong>{me.favoriteGenre}</strong>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map((a) => (
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

export default Recommendations;
