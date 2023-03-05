import { useState, useEffect } from "react";

import getAll from "./services/countries";
import Countries from "./components/display";

const Filter = ({ value, handleChange }) => (
    <form>
        Find countries <input value={value} onChange={handleChange}></input>
    </form>
);

const App = () => {
    const [countries, setCountries] = useState([]);
    const [newFilter, setNewFilter] = useState("");
    const [showCountries, setShowCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    // I will attempt the method with a [] as the 2nd parameter:
    // I figure avoiding GET calls everytime a letter is typed would be nice.
    useEffect(() => {
        getAll().then((allCountries) => {
            setCountries(allCountries);
            setFilteredCountries(allCountries);
            setNewFilter("");
        });
    }, []);

    console.log(`Rendered ${countries.length} countries`);

    const handleFilterChange = (event) => {
        //sets newFilter to the form input value
        console.log(event.target.value);
        const updatedFilter = event.target.value.toLowerCase();
        setNewFilter(updatedFilter);

        //filters the countries accordingly and sets filteredCountries
        //I keep countries and filteredCountries separate
        // so that countries is never mutated
        const updatedFilteredCountries = countries.filter((country) =>
            country.name.common.toLowerCase().includes(updatedFilter)
        );
        setFilteredCountries(updatedFilteredCountries);

        // this array controls whether to show or hide a country's information
        // this works via the toggleShow() event handler
        // here it is simply being initialized and filled with false
        const newShowCountries = [];
        newShowCountries.length = updatedFilteredCountries.length;
        newShowCountries.fill(false);
        setShowCountries(newShowCountries);
    };

    const toggleShow = (idx) => {
        // toggles the state determining the display of a country's information
        console.log(`show/hide was clicked at idx ${idx}`);
        const newShowCountries = [...showCountries];
        newShowCountries[idx] = !newShowCountries[idx];
        setShowCountries(newShowCountries);
    };

    if (countries.length > 0) {
        return (
            <>
                <div>
                    <Filter
                        value={newFilter}
                        handleChange={handleFilterChange}
                    />
                </div>
                <div>
                    <Countries
                        filter={newFilter}
                        countries={filteredCountries}
                        showCountries={showCountries}
                        toggleShow={toggleShow}
                    />
                </div>
            </>
        );
    } else {
        return <p>Loading...</p>;
    }
};

export default App;
