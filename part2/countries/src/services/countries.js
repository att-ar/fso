import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const baseUrl = "https://restcountries.com/v3.1/all";
const weatherUrl = (lat, lon, key = api_key) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

const getAll = () => {
    return axios.get(`${baseUrl}`).then((response) => response.data);
};

const getWeather = (lat, lon) => {
    return axios
        .get(weatherUrl(lat, lon))
        .then((response) => {
            const temperature = response.data.main.temp;
            const iconId = response.data.weather[0].icon;
            const iconLink = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            const iconAlt = response.data.weather[0].description;
            const windSpeed = response.data.wind.speed;
            return { temperature, iconLink, iconAlt, windSpeed };
        })
        .catch((error) => {
            console.log("Error");
        });
};

const countryService = { getAll, getWeather };
export default countryService;
