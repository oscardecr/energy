import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getClasses, bookClass } from '../services/api';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import theme from '../theme';

const Classes = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await getClasses();
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes', error);
            }
        };

        fetchClasses();
    }, []);

    const handleBookClass = async (classId) => {
        try {
            const response = await bookClass(classId);
            console.log('Class booked successfully', response.data);
        } catch (error) {
            console.error('Error booking class', error);
        }
    };

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    body: { backgroundColor: '#000000', margin: 0, height: '100%' },
                    html: { backgroundColor: '#000000', height: '100%', margin: 0 },
                    '#root': { backgroundColor: '#000000', height: '100%' }
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    bgcolor: 'transparent',
                    color: 'text.primary',
                }}
            >
                <AppAppBar />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        textAlign: 'center',
                        py: 3,
                    }}
                >
                    <Container sx={{ textAlign: 'center', mb: 5 }}>
                        <Typography variant="h2" gutterBottom>Available Classes</Typography>
                    </Container>
                    <Grid container spacing={4} justifyContent="center">
                        {classes.map((cls) => (
                            <Grid item xs={12} sm={6} md={4} key={cls.id}>
                                <Paper elevation={3} sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 3 }}>
                                    <Typography variant="h6" gutterBottom>Class Code: {cls.code}</Typography>
                                    <Typography variant="body1" gutterBottom>Day: {cls.day}</Typography>
                                    <Typography variant="body1" gutterBottom>Hour: {cls.hour}</Typography>
                                    <Button variant="contained" color="success" onClick={() => handleBookClass(cls.id)}>
                                        Book Class
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Classes;
