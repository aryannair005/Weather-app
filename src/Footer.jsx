import { Box, Typography, Link, Divider } from '@mui/material';
import { GitHub as GitHubIcon, Info as InfoIcon } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box sx={{ mt: 6, py: 3, textAlign: 'center' }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Built with ❤️ using React & Material-UI
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Powered by OpenWeatherMap API
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Link 
                    href="https://github.com/yourusername/weather-app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    <GitHubIcon fontSize="small" />
                    GitHub
                </Link>
                <Link 
                    href="https://openweathermap.org/api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    <InfoIcon fontSize="small" />
                    API Docs
                </Link>
            </Box>
            
            <Typography variant="caption" color="text.secondary">
                © 2024 Weather App. All rights reserved.
            </Typography>
        </Box>
    );
}
