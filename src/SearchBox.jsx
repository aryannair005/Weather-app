import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography, Alert, CircularProgress, Chip, Paper } from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import "./SearchBox.css"
import { useState } from 'react';
import { API_CONFIG } from './config';

export default function SearchBox({ updateInfo, onSearchStart, onSearchComplete }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [recentSearches, setRecentSearches] = useState([]);

    function handleChange(event) {
        setCity(event.target.value);
        if (error) setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (loading) return;
        
        let info = await getWeatherInfo();
        if (info) {
            updateInfo(info);
            setCity("");
            // Add to recent searches
            if (!recentSearches.includes(info.city)) {
                setRecentSearches(prev => [info.city, ...prev.slice(0, 4)]);
            }
        }
    }

    const handleRecentSearch = (recentCity) => {
        setCity(recentCity);
        handleSubmit({ preventDefault: () => {} });
    };

    let getWeatherInfo = async () => {
        try {
            setError("");
            setLoading(true);
            onSearchStart?.();

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
                city: jsonResponse[0].name,
                country: jsonResponse[0].country,
                temp: jsonWeather.main.temp,
                tempMin: jsonWeather.main.temp_min,
                tempMax: jsonWeather.main.temp_max,
                humidity: jsonWeather.main.humidity,
                feelsLike: jsonWeather.main.feels_like,
                weather: jsonWeather.weather[0].description,
                pressure: jsonWeather.main.pressure,
                windSpeed: jsonWeather.wind.speed,
                windDirection: jsonWeather.wind.deg,
                visibility: jsonWeather.visibility,
                sunrise: new Date(jsonWeather.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                }),
                sunset: new Date(jsonWeather.sys.sunset * 1000).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                }),
                timezone: jsonWeather.timezone
            };
        } catch (err) {
            setError("Something went wrong. Please try again later.");
            console.error(err);
            return null;
        } finally {
            setLoading(false);
            onSearchComplete?.();
        }
    };

    return (
        <Box className="SearchBox" sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'text.primary' }}>
                Search Weather
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <TextField
                        id="city"
                        label="Enter City Name"
                        variant="outlined"
                        onChange={handleChange}
                        value={city}
                        disabled={loading}
                        sx={{ minWidth: 300 }}
                        InputProps={{
                            startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                    />
                    
                    <Button 
                        variant="contained" 
                        type="submit" 
                        disabled={loading || !city.trim()}
                        startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                        sx={{ minWidth: 120, py: 1, px: 3 }}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </Box>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2, maxWidth: 400, mx: 'auto' }}>
                    {error}
                </Alert>
            )}

            {recentSearches.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Recent searches:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {recentSearches.map((recentCity, index) => (
                            <Chip
                                key={index}
                                label={recentCity}
                                onClick={() => handleRecentSearch(recentCity)}
                                variant="outlined"
                                size="small"
                                clickable
                                sx={{ cursor: 'pointer' }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}
