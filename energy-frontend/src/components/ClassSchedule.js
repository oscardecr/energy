import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Grid, Card, CardContent, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import theme from '../theme';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';


const classSchedule = {
    "lunes": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "martes": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "miércoles": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "jueves": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "viernes": ["05:00", "06:15", "07:30", "08:45", "10:00", "16:15", "17:30", "18:45", "20:00"],
    "sábado": ["08:00", "09:15", "10:30"],
    "domingo": []
};

const ClassSchedule = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [day, setDay] = useState(format(new Date(), 'eeee', { locale: es }).toLowerCase());
    const [setClasses] = useState([]);


    const handleDateChange = (event) => {
        setDate(event.target.value);
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
                        <Typography variant="h3" gutterBottom sx={{ color: '#ffffff', textAlign: 'center' }}>Selecciona una fecha</Typography>
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
                    <Typography variant="h5" gutterBottom sx={{ color: '#ffffff', textAlign: 'center' }}>Clases disponibles el día {format(parseISO(date), 'PPP', { locale: es })}</Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {(classSchedule[day] || []).map((time) => (
                            <Grid item xs={12} sm={6} md={4} key={time}>
                                <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                                    <CardContent>
                                        <Typography variant="h6">{`Clase de ${time}`}</Typography>
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
