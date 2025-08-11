// API Configuration
export const API_CONFIG = {
    GEOCODING_URL: "http://api.openweathermap.org/geo/1.0/direct",
    WEATHER_URL: "https://api.openweathermap.org/data/2.5/weather",
    API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || "64aa36f8b6f6c05d3f61e77432ca7ee5"
};
