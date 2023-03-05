import { useState, useEffect } from "react";

import getAll from "./services/countries";

const Filter = ({ value, handleChange }) => (
    <form>
        find countries <input value={value} onChange={handleChange}></input>
    </form>
);

const Flag = ({ src, alt }) => {
    return <img src={src} alt={alt} height="100" width="150" border="1"></img>;
};

const Country = ({ name, capital, area, languages, flags }) => {
    const mapLanguages = (langues) =>
        Object.values(langues).map((langue) => <li key={langue}>{langue}</li>);
    return (
        <div>
            <h2>{name}</h2>
            <p>
                Capital: {capital}
                <br />
                Area: {area}
            </p>
            <div>
                <h3>languages:</h3>
                <ul>{mapLanguages(languages)}</ul>
            </div>
            <div>
                <Flag src={flags.svg} alt={flags.alt} />
            </div>
        </div>
    );
};
const Countries = ({ filter, countries }) => {
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter)
    );

    switch (true) {
        case filteredCountries.length > 11:
            return <p>Too many countries, choose another filter</p>;
        case filteredCountries.length < 11 && filteredCountries.length > 1:
            return filteredCountries.map((country) => (
                <p key={country.name.common}>{country.name.common}</p>
            ));
        case filteredCountries.length === 1:
            console.log("Country name:", filteredCountries[0].name.common);
            return (
                <Country
                    // key={filteredCountries[0].name.common}
                    name={filteredCountries[0].name.common}
                    capital={filteredCountries[0].capital[0]}
                    area={filteredCountries[0].area}
                    languages={filteredCountries[0].languages}
                    flags={filteredCountries[0].flags}
                />
            );
        default:
            return <p>No country's common name matches the filter: {filter}</p>;
    }
};

const App = () => {
    const [countries, setCountries] = useState([]);
    const [newFilter, setNewFilter] = useState("");

    const handleFilterChange = (event) => {
        console.log(event.target.value);
        setNewFilter(event.target.value.toLowerCase());
    };

    // I will attempt the method with a [] as the 2nd parameter:
    // I figure avoiding GET calls everytime a letter is typed would be nice.
    useEffect(() => {
        getAll().then((allCountries) => {
            console.log(allCountries[0]);
            setCountries(allCountries);
        });
    }, []);

    console.log(`Rendered ${countries.length} countries`);

    return (
        <>
            <div>
                <Filter value={newFilter} handleChange={handleFilterChange} />
            </div>
            <div>
                <Countries filter={newFilter} countries={countries} />
            </div>
        </>
    );
};

export default App;
