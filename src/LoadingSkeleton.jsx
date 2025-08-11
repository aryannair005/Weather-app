import { 
    Box, 
    Skeleton, 
    Card, 
    CardContent, 
    Grid, 
    Paper 
} from '@mui/material';

export default function LoadingSkeleton() {
    return (
        <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                {/* Main Weather Card Skeleton */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <Box sx={{ 
                            background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                            p: 3,
                            textAlign: 'center'
                        }}>
                            <Skeleton variant="circular" width={40} height={40} sx={{ mx: 'auto', mb: 2 }} />
                            <Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 1 }} />
                            <Skeleton variant="text" width="80%" height={40} sx={{ mx: 'auto', mb: 1 }} />
                            <Skeleton variant="text" width="50%" height={30} sx={{ mx: 'auto' }} />
                        </Box>
                        
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Skeleton variant="text" width="60%" height={40} />
                                        <Skeleton variant="text" width="40%" height={20} />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Skeleton variant="text" width="60%" height={40} />
                                        <Skeleton variant="text" width="40%" height={20} />
                                    </Box>
                                </Grid>
                            </Grid>
                            
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Skeleton variant="text" width="70%" height={30} />
                                <Skeleton variant="rectangular" width={120} height={32} sx={{ mx: 'auto', mt: 1, borderRadius: 16 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Additional Weather Details Skeleton */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item xs={12} sm={6} key={item}>
                                <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                                    <Skeleton variant="circular" width={30} height={30} sx={{ mx: 'auto', mb: 1 }} />
                                    <Skeleton variant="text" width="80%" height={30} sx={{ mx: 'auto', mb: 1 }} />
                                    <Skeleton variant="text" width="60%" height={20} sx={{ mx: 'auto' }} />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
