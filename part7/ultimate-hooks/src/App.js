import { useField, useResource } from "./hooks";

const ClearButton = ({ onClick }) => (
    <button type="button" onClick={onClick}>
        clear
    </button>
);

const App = () => {
    const { reset: resetContent, ...content } = useField("text");
    const { reset: resetName, ...name } = useField("text");
    const { reset: resetNumber, ...number } = useField("text");

    const [notes, noteService] = useResource("http://localhost:3005/notes");
    const [persons, personService] = useResource(
        "http://localhost:3005/persons"
    );

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        noteService.create({ content: content.value });
        resetContent();
    };

    const handleNoteDelete = (id) => {
        noteService.remove(id);
    };

    const handlePersonSubmit = (event) => {
        event.preventDefault();
        const included = persons.find((p) => p.name === name.value);
        if (included) {
            personService.update({ ...included, number: number.value });
        } else {
            personService.create({ name: name.value, number: number.value });
        }
        resetName();
        resetNumber();
    };
    const handlePersonDelete = (id) => {
        personService.remove(id);
    };

    return (
        <div>
            <h2>notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button>create</button>
                <ClearButton onClick={resetContent} />
            </form>
            {notes.map((n) => (
                <p key={n.id}>
                    {n.content}
                    <button onClick={() => handleNoteDelete(n.id)}>
                        delete
                    </button>
                </p>
            ))}

            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name} /> <br />
                number <input {...number} />
                <button>create</button>
                <ClearButton
                    onClick={() => {
                        resetName();
                        resetNumber();
                    }}
                />
            </form>
            {persons.map((n) => (
                <p key={n.id}>
                    {n.name} {n.number}
                    <button onClick={() => handlePersonDelete(n.id)}>
                        delete
                    </button>
                </p>
            ))}
        </div>
    );
};

export default App;
