const Weather = ({ capital, temperature, iconLink, iconAlt, windSpeed }) => {
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
