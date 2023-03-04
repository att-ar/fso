import { useState, useEffect } from "react";
import entryService from "./services/persons";

import Entry from "./components/Entry";
import PersonForm from "./components/PersonForm";

const Filter = ({ value, handleChange }) => (
    <form>
        filter shown having{" "}
        <input value={value} onChange={handleChange}></input>
    </form>
);

const Persons = ({ persons, filter, handleDelete }) => {
    const mapPersons = (persons) =>
        persons.map((person) => {
            // console.log("Numbers:", person.name, person.number);
            return (
                <Entry
                    key={person.name}
                    person={person}
                    handleDelete={() => handleDelete(person.id)}
                />
            );
        });

    const filterLength = filter.length;

    if (filterLength > 0) {
        const usePersons = persons.filter(
            (person) =>
                person.name.slice(0, filterLength).toLowerCase() === filter
        );
        return mapPersons(usePersons);
    } else {
        return mapPersons(persons);
    }
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    // empty array as second arg to only trigger after the first render
    useEffect(() => {
        console.log("effect");
        entryService.getAll().then((initialPeople) => {
            setPersons(initialPeople);
        });
    }, []);

    console.log("render", persons.length, "entries");

    const isIncluded = () => {
        let included = false;
        let included_id;
        for (let { name, id } of persons) {
            included = name === newName;
            if (included) {
                included_id = id;
                break;
            }
        }
        return [included, included_id];
    };
    const addPerson = (event) => {
        //don't need to do a double function because
        //this gets passed without an argument,
        //event is filled automatically by the form
        event.preventDefault();
        console.log("button clicked", event.target);

        const [included, included_id] = isIncluded();
        const newEntry = {
            name: newName,
            number: newNumber,
        };

        if (included) {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook, replace the old number with a new one?`
                )
            ) {
                entryService
                    .update(included_id, newEntry)
                    .then((returnedEntry) =>
                        setPersons(
                            persons.map((person) =>
                                person.id !== included_id
                                    ? person
                                    : returnedEntry
                            )
                        )
                    );
            }
        } else {
            entryService.create(newEntry).then((returnedEntry) => {
                setPersons(persons.concat(returnedEntry));
                setNewName("");
                setNewNumber("");
            });
        }
    };
    const handleNameChange = (event) => {
        //event.target = input field
        // .value is the input value (newName)
        // console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };
    // note I added the event handlers to the onSubmit attribute of form
    // but the same functionality is achieved by adding them to onClick of button
    // probably better to keep it in the form though.

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value.toLowerCase());
        console.log("newFilter:", event.target.value.toLowerCase());
    };

    const handleDelete = (id) => {
        const entryToDelete = persons.find((person) => person.id === id);
        if (window.confirm(`Delete '${entryToDelete.name}'?`)) {
            console.log("entry to delete", entryToDelete);
            entryService.deleteId(id).then((response) => {
                console.log(`Status: ${response.statusText}`);
                setPersons(persons.filter((person) => person.id !== id));
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} handleChange={handleFilterChange} />

            <h3>add a new</h3>
            <PersonForm
                handleSubmit={addPerson}
                nameValue={newName}
                handleName={handleNameChange}
                numberValue={newNumber}
                handleNumber={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons
                persons={persons}
                filter={newFilter}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default App;
