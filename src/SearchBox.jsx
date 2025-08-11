import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
import { API_CONFIG } from './config';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState("");

    function handleChange(event) {
        setCity(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let info = await getWeatherInfo();
        if (info) {
            updateInfo(info);
            setCity(""); 
        }
    }

    

    let getWeatherInfo = async () => {
        try {
            setError("");

            if (!city.trim()) {
                setError("Please enter a city name");
                return null;
            }

            let response = await fetch(`${API_CONFIG.GEOCODING_URL}?q=${city}&appid=${API_CONFIG.API_KEY}`);
            let jsonResponse = await response.json();

            if (!jsonResponse || jsonResponse.length === 0) {
                setError(`City "${city}" does not exist`);
                return null;
            }

            let lat = jsonResponse[0].lat;
            let lon = jsonResponse[0].lon;

            let weatherInfo = await fetch(
                `${API_CONFIG.WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_CONFIG.API_KEY}&units=metric`
            );
            let jsonWeather = await weatherInfo.json();

            return {
                city: city,
                temp: jsonWeather.main.temp,
                tempMin: jsonWeather.main.temp_min,
                tempMax: jsonWeather.main.temp_max,
                humidity: jsonWeather.main.humidity,
                feelsLike: jsonWeather.main.feels_like,
                weather: jsonWeather.weather[0].description,
            };
        } catch (err) {
            setError("Something went wrong. Please try again later.");
            console.error(err);
            return null;
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="Enter City"
                    variant="outlined"
                    onChange={handleChange}
                    value={city}
                />
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
            </form>

            {/* Error message in red */}
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    )
}
