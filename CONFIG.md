# Configuration Guide

## Environment Variables

To run this Weather App, you need to set up environment variables. Create a `.env` file in the root directory with the following:

```bash
# OpenWeatherMap API Configuration
# Get your API key from: https://openweathermap.org/api
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## How to Get an API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "My API keys" section
4. Copy your API key
5. Replace `your_api_key_here` in your `.env` file

## Important Notes

- The `.env` file should be in the root directory of your project
- Never commit your `.env` file to version control
- The `.env` file is already added to `.gitignore`
- Restart your development server after creating the `.env` file

## Fallback

If no environment variable is set, the app will use a default API key (not recommended for production use).
