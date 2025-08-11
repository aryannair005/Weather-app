import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import ForecastBox from './ForecastBox'
import LoadingSkeleton from './LoadingSkeleton'
import Footer from './Footer'
import { useState } from 'react'
import { Container, Typography, Box, Paper, Divider } from '@mui/material'
import { WbSunny as WeatherIcon } from '@mui/icons-material'

export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]=useState({
        city:"Delhi",
        feelsLike:24.84,
        temp:25.05,
        tempMin:25.05,
        tempMax:25.05,
        humidity:47,
        weather:"haze",
        pressure: 1013,
        windSpeed: 2.1,
        windDirection: 180,
        visibility: 10000,
        sunrise: "06:30",
        sunset: "18:45",
        country: "IN",
        timezone: 19800
    })
    const [loading, setLoading] = useState(false);
    
    let updateInfo=(result)=>{
        setWeatherInfo(result);
    }
    
    const handleSearchStart = () => {
        setLoading(true);
    };
    
    const handleSearchComplete = () => {
        setLoading(false);
    };
    
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <WeatherIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h3" component="h1" color="primary" fontWeight="bold">
                        Weather App
                    </Typography>
                </Box>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    Get real-time weather information for any city worldwide
                </Typography>
            </Box>
            
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <SearchBox 
                    updateInfo={updateInfo} 
                    onSearchStart={handleSearchStart}
                    onSearchComplete={handleSearchComplete}
                />
            </Paper>
            
            {loading ? (
                <LoadingSkeleton />
            ) : (
                <>
                    <InfoBox info={weatherInfo} />
                    <ForecastBox />
                </>
            )}
            
            <Footer />
        </Container>
    )
}