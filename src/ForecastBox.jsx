import { 
    Box, 
    Typography, 
    Paper, 
    Grid, 
    Chip,
    Divider
} from '@mui/material';
import { 
    WbSunny as SunnyIcon, 
    Opacity as RainIcon,
    AcUnit as SnowIcon,
    Cloud as CloudIcon
} from '@mui/icons-material';

export default function ForecastBox({ forecastData }) {
    // Mock forecast data - in a real app, this would come from the API
    const mockForecast = [
        { day: 'Today', temp: 25, weather: 'sunny', icon: 'sunny' },
        { day: 'Tomorrow', temp: 22, weather: 'cloudy', icon: 'cloud' },
        { day: 'Wed', temp: 19, weather: 'rainy', icon: 'rain' },
        { day: 'Thu', temp: 24, weather: 'sunny', icon: 'sunny' },
        { day: 'Fri', temp: 27, weather: 'sunny', icon: 'sunny' }
    ];

    const getWeatherIcon = (iconType) => {
        switch (iconType) {
            case 'sunny':
                return <SunnyIcon sx={{ fontSize: 30, color: 'warning.main' }} />;
            case 'rain':
                return <RainIcon sx={{ fontSize: 30, color: 'info.main' }} />;
            case 'snow':
                return <SnowIcon sx={{ fontSize: 30, color: 'primary.main' }} />;
            case 'cloud':
                return <CloudIcon sx={{ fontSize: 30, color: 'text.secondary' }} />;
            default:
                return <SunnyIcon sx={{ fontSize: 30, color: 'warning.main' }} />;
        }
    };

    const getTempColor = (temp) => {
        if (temp > 25) return 'error';
        if (temp > 20) return 'warning';
        if (temp > 15) return 'success';
        return 'info';
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 3, color: 'text.primary' }}>
                5-Day Forecast
            </Typography>
            
            <Grid container spacing={2}>
                {mockForecast.map((day, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                        <Paper 
                            elevation={1} 
                            sx={{ 
                                p: 2, 
                                textAlign: 'center',
                                '&:hover': {
                                    elevation: 4,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.2s ease-in-out'
                                }
                            }}
                        >
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                {day.day}
                            </Typography>
                            
                            <Box sx={{ mb: 1 }}>
                                {getWeatherIcon(day.icon)}
                            </Box>
                            
                            <Typography 
                                variant="h6" 
                                color={getTempColor(day.temp)}
                                sx={{ mb: 1 }}
                            >
                                {day.temp}°C
                            </Typography>
                            
                            <Typography variant="caption" color="text.secondary">
                                {day.weather}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    💡 Tip: Click on any day to see detailed hourly forecast
                </Typography>
            </Box>
        </Paper>
    );
}
