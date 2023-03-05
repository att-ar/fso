const Button = ({ text, toggleShow }) => {
    return <button onClick={toggleShow}>{text}</button>;
};
const Flag = ({ src, alt }) => {
    return <img src={src} alt={alt} height="80" width="120"></img>;
};

const SingleCountry = ({
    name,
    capital,
    area,
    languages,
    flags,
    toggleShow = null,
    display = true,
}) => {
    if (display) {
        const addButton =
            toggleShow === null ? null : (
                <Button text={"hide"} toggleShow={toggleShow} />
            );
        const mapLanguages = (langues) =>
            Object.values(langues).map((langue) => (
                <li key={langue}>{langue}</li>
            ));
        return (
            <div>
                <h2>{name}</h2>
                <p>{addButton}</p>
                <p>Capital: {capital}</p>
                <p>Area: {area}</p>
                <div>
                    <h3>languages:</h3>
                    <ul>{mapLanguages(languages)}</ul>
                </div>
                <div>
                    <Flag src={flags.svg} alt={flags.alt} />
                </div>
            </div>
        );
    } else {
        return (
            <p key={name}>
                {name} <Button text={"show"} toggleShow={toggleShow} />
            </p>
        );
    }
};

const ListCountry = ({ countries, showCountries, toggleShow }) => {
    // All the necessary information to decide whether or not to display
    // information is passed to SingleCountry which then
    // uses the values of display and toggleShow to render.
    return countries.map((country, index) => {
        return (
            <SingleCountry
                key={country.name.common}
                name={country.name.common}
                capital={country.capital[0]}
                area={country.area}
                languages={country.languages}
                flags={country.flags}
                toggleShow={() => toggleShow(index)}
                display={showCountries[index]}
            />
        );
    });
};

const Countries = ({ filter, countries, showCountries, toggleShow }) => {
    //responsible for displaying the countries
    switch (true) {
        case countries.length > 11:
            return <p>Too many countries, choose another filter.</p>;

        case countries.length < 11 && countries.length > 1:
            //ListCountry adds the show/hide buttons and is capable of updating
            // the showCountries state array by passing toggleShow to SingleCountry.
            // SingleCountry makes use of conditional rendering.
            return (
                <ListCountry
                    countries={countries}
                    showCountries={showCountries}
                    toggleShow={toggleShow}
                />
            );

        case countries.length === 1:
            const result = countries[0];
            return (
                <SingleCountry
                    key={result.name.common}
                    name={result.name.common}
                    capital={result.capital[0]}
                    area={result.area}
                    languages={result.languages}
                    flags={result.flags}
                />
            );

        default:
            return <p>No country's common name matches the filter: {filter}</p>;
    }
};

export default Countries;
