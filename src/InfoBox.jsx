import { 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Grid, 
    Divider, 
    Chip,
    Paper
} from '@mui/material';
import { 
    WbSunny as SunnyIcon, 
    Thunderstorm as ThunderstormIcon, 
    AcUnit as SnowIcon,
    Opacity as RainIcon,
    Visibility as VisibilityIcon,
    Speed as WindIcon,
    Compress as PressureIcon,
    WbSunny as SunriseIcon,
    NightsStay as SunsetIcon
} from '@mui/icons-material';
import "./InfoBox.css";

export default function InfoBox({ info }) {
    const getWeatherIcon = (temp, humidity, weather) => {
        if (humidity > 80) return <RainIcon sx={{ fontSize: 40, color: 'info.main' }} />;
        if (temp > 25) return <SunnyIcon sx={{ fontSize: 40, color: 'warning.main' }} />;
        if (temp < 10) return <SnowIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
        if (weather.includes('thunder')) return <ThunderstormIcon sx={{ fontSize: 40, color: 'error.main' }} />;
        return <SunnyIcon sx={{ fontSize: 40, color: 'warning.main' }} />;
    };

    const getWeatherColor = (temp) => {
        if (temp > 30) return 'error';
        if (temp > 20) return 'warning';
        if (temp > 10) return 'success';
        return 'info';
    };

    const formatWindDirection = (degrees) => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    };

    return (
        <Box className="InfoBox">
            <Grid container spacing={3}>
                {/* Main Weather Card */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ height: '100%' }}>
                        <Box sx={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            p: 3,
                            textAlign: 'center'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                {getWeatherIcon(info.temp, info.humidity, info.weather)}
                            </Box>
                            <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                                {info.temp}°C
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                {info.city}, {info.country}
                            </Typography>
                            <Typography variant="body1" sx={{ textTransform: 'capitalize', opacity: 0.9 }}>
                                {info.weather}
                            </Typography>
                        </Box>
                        
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" color="primary">
                                            {info.tempMax}°C
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            High
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" color="info.main">
                                            {info.tempMin}°C
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Low
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                            <Divider sx={{ my: 2 }} />
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Feels like <strong>{info.feelsLike}°C</strong>
                                </Typography>
                                <Chip 
                                    label={`Humidity: ${info.humidity}%`}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Additional Weather Details */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        {/* Wind Information */}
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                                <WindIcon sx={{ fontSize: 30, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h6" component="div">
                                    {info.windSpeed} m/s
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatWindDirection(info.windDirection)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Wind
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Pressure */}
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                                <PressureIcon sx={{ fontSize: 30, color: 'secondary.main', mb: 1 }} />
                                <Typography variant="h6" component="div">
                                    {info.pressure} hPa
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Pressure
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Visibility */}
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                                <VisibilityIcon sx={{ fontSize: 30, color: 'info.main', mb: 1 }} />
                                <Typography variant="h6" component="div">
                                    {(info.visibility / 1000).toFixed(1)} km
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Visibility
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Sunrise/Sunset */}
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <SunriseIcon sx={{ fontSize: 25, color: 'warning.main' }} />
                                        <Typography variant="body2" component="div">
                                            {info.sunrise}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Sunrise
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <SunsetIcon sx={{ fontSize: 25, color: 'error.main' }} />
                                        <Typography variant="body2" component="div">
                                            {info.sunset}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Sunset
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}