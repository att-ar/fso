const Weather = ({ capital, temperature, iconLink, iconAlt, windSpeed }) => {
    //the following useEffect should only trigger at initial render
    //and whenever the filter results in a single country (since this changes loadWeather).
    // the trigger at initial render does nothing because of an if statement
    // this is to prevent fetching the api with no latitude and no longitude
    return (
        <>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {temperature} Celsius</p>
            <img src={iconLink} alt={iconAlt} height="45" width="45"></img>
            <p>Wind: {windSpeed} m/s</p>
        </>
    );
};

export default Weather;
