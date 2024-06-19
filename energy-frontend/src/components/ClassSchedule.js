import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Grid, Card, CardContent, Button, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import theme from '../theme';

const classSchedule = {
    "Monday": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "Tuesday": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "Wednesday": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "Thursday": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "Friday": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "Saturday": ["08:00", "09:15", "10:30"],
    "Sunday": []
};

const ClassSchedule = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [day, setDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long', timeZone: 'America/Chicago' }));
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const selectedDate = new Date(date + 'T00:00:00-06:00');
        const selectedDay = selectedDate.toLocaleString('en-US', { weekday: 'long', timeZone: 'America/Chicago' });
        setDay(selectedDay);
        fetchClasses(selectedDate);
    }, [date]);

    const fetchClasses = async (selectedDate) => {
        try {
            const response = await axios.get('https://energy-e6xp.onrender.com/classes/', {
                params: {
                    date: selectedDate.toISOString().split('T')[0]
                }
            });
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes', error);
        }
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleBookClass = async (classTime) => {
        try {
            const classData = {
                day: date,
                hour: classTime
            };
            const response = await axios.post('http://127.0.0.1:8000/classes/', classData);
            console.log('Class booked successfully', response.data);
            fetchClasses(new Date(date));
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
                        mt: 8, // Add margin-top to create space below AppAppBar
                    }}
                >
                    <Container sx={{ textAlign: 'center', mb: 5 }}>
                        <Typography variant="h2" gutterBottom>Selecciona una fecha</Typography>
                        <TextField
                            label=""
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '5px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                input: {
                                    color: '#000000',
                                    padding: '10px 14px',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00e676',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00e676',
                                    },
                                },
                            }}
                        />
                    </Container>
                    <Typography variant="h5" gutterBottom>Clases disponibles el día {new Date(date + 'T00:00:00-06:00').toDateString()}</Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {classSchedule[day].map((time) => (
                            <Grid item xs={12} sm={6} md={4} key={time}>
                                <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                                    <CardContent>
                                        <Typography variant="h6">{`Clase de ${time}`}</Typography>
                                        <Button variant="contained" color="success" onClick={() => handleBookClass(time)}>
                                            Book Class
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default ClassSchedule;
