import { useState } from "react";

const Entry = ({ person: { name, number } }) => (
    // console.log("Entry name:", name);
    // I will use .map() to pass each object individually to Entry
    <>
        {name} {number}
        <br></br>
    </>
);

const Filter = ({ value, handleChange }) => (
    <form>
        filter shown having{" "}
        <input value={value} onChange={handleChange}></input>
    </form>
);
const PersonForm = ({
    handleSubmit,
    nameValue,
    handleName,
    numberValue,
    handleNumber,
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            name: <input value={nameValue} onChange={handleName} />
        </div>
        <div>
            number: <input value={numberValue} onChange={handleNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

const Persons = ({ persons, filter }) => {
    const mapPersons = (persons) =>
        persons.map((person) => {
            // console.log("Numbers:", person.name, person.number);
            return <Entry key={person.name} person={person} />;
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
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 0 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 1 },
        { name: "Dan Abramov", number: "12-43-234345", id: 2 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 3 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    const addPerson = (event) => {
        //don't need to do a double function because
        //this gets passed without an argument,
        //event is filled automatically by the form
        event.preventDefault();
        console.log("button clicked name", event.target);

        let included = false;
        for (let { name } of persons) {
            if (included) {
                break;
            } else {
                included = name === newName;
            }
        }

        if (included) {
            setNewName("");
            alert(`${newName} is already added to the phonebook.`);
        } else {
            const newEntry = {
                name: newName,
                number: newNumber,
                id: persons.length,
            };
            setPersons(persons.concat(newEntry)); //adds the name
            setNewName(""); //resets the input field
            setNewNumber("");
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
            <Persons persons={persons} filter={newFilter} />
        </div>
    );
};

export default App;
