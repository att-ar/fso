import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useField } from "../hooks";

const NewBook = () => {
    const { reset: resetTitle, ...title } = useField("text");
    const { reset: resetAuthor, ...author } = useField("text");
    const { reset: resetPublished, ...published } = useField("number");
    const { reset: resetGenre, ...genre } = useField("text");
    const [genres, setGenres] = useState([]);

    const navigate = useNavigate();

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error.graphQLErrors[0].message);
        },
        update: (cache, response) => {
            cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(response.data.addBook),
                };
            });
            navigate("/books");
            //too complicated to update authors manually rn
            // cache.updateQuery({query: ALL_AUTHORS}, ({allAuthors}) => {
            //     author = allAuthors.find(a => a.name === response.data.addBook.author)
            //     return {
            //         allAuthors: allAuth
            //     }
            // })
        },
    });

    const submit = async (event) => {
        event.preventDefault();

        createBook({
            variables: {
                title: title.value,
                author: author.value,
                published: Number(published.value),
                genres,
            },
        });

        resetTitle();
        resetPublished();
        resetAuthor();
        setGenres([]);
        resetGenre();
    };

    const addGenre = () => {
        setGenres(genres.concat(genre.value));
        resetGenre();
    };

    //the button type "number" gives arrows for changing the value
    return (
        <div style={{ padding: 10 }}>
            <form onSubmit={submit}>
                <div>
                    title
                    <input {...title} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    published
                    <input {...published} />
                </div>
                <div>
                    <input {...genre} />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(" ")}</div>
                <div style={{ marginTop: 4 }}>
                    <button type="submit">create book</button>
                    <button
                        type="button"
                        onClick={() => {
                            resetTitle();
                            resetAuthor();
                            resetPublished();
                            resetGenre();
                            setGenres([]);
                        }}>
                        clear form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewBook;
